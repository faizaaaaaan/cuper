"use client";

import { EyeIcon, TriangleAlert } from "lucide-react";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signup } from "@/schemas";
import { EyeOffIcon, Loader } from "lucide-react";
import { FormSuccess } from "./FormSuccess";
import RegisterUser from "@/action/register";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type formValues = z.infer<typeof signup>;

export default function RegisterForm() {
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<formValues>({
    resolver: zodResolver(signup),
    mode: "onChange",
  });

  const onSubmit = async (data: formValues) => {
    setDisabled(true);
    setLoading(true);
    setError(null);
    setSuccess(null);

    // TODO: Call your API here
    await RegisterUser({ data }).then((res) => {
      if (res.error) {
        setError(res.error || "An error occurred");
        setLoading(false);
        setDisabled(false);
      } else {
        setSuccess(res.success || "User has been registered");
        // reset();
        setLoading(false);
        setDisabled(false);
      }
    });
  };

  const togglePassword = () => {
    setVisiblePassword((prev) => !prev);
  };

  return (
    <form
      className="mt-4 flex flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <Label htmlFor="name">Full name</Label>
        <Input
          id="name"
          placeholder="John Doe"
          className="mt-1 bg-[#f7f7f7] border-0"
          required
          {...register("name")}
        />
      </div>

      <div>
        <Label htmlFor="email">Email address</Label>
        <Input
          id="email"
          type="email"
          {...register("email")}
          placeholder="name@example.com"
          className="mt-1 bg-[#f7f7f7] border-0"
          required
        />
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <div className="relative flex w-full items-center justify-center">
          <Input
            id="password"
            type={visiblePassword ? "text" : "password"}
            className="mt-1 bg-[#f7f7f7] border-0"
            required
            {...register("password")}
          />
          {visiblePassword ? (
            <EyeOffIcon
              className="absolute right-2 h-full cursor-pointer text-muted-foreground"
              size={18}
              onClick={togglePassword}
            />
          ) : (
            <EyeIcon
              className="absolute right-2 h-full cursor-pointer text-muted-foreground"
              size={18}
              onClick={togglePassword}
            />
          )}
        </div>
      </div>

      {errors && (
        <div
          className={
            errors.email || errors.password
              ? "flex w-full flex-col gap-1"
              : "hidden"
          }
        >
          {errors.email && (
            <div
              className="relative w-full rounded-md border border-red-600 bg-red-200 px-3 py-2 text-gray-900 dark:border-red-700/40 dark:bg-red-600/20 dark:text-gray-300"
              role="alert"
            >
              <span className="flex flex-col text-xs">
                {errors.email.message}
              </span>
            </div>
          )}

          {errors.password && (
            <div
              className="relative w-full rounded-md border border-red-600 bg-red-200 px-3 py-2 text-gray-900 dark:border-red-700/40 dark:bg-red-600/20 dark:text-gray-300"
              role="alert"
            >
              <span className="flex flex-col text-xs">
                {errors.password.message}
              </span>
            </div>
          )}
        </div>
      )}

      <Button className="flex gap-1" type="submit" disabled={disabled}>
        {loading && <Loader className="animate-spin" size={15} />}
        Register
      </Button>

      {error && (
        <div
          className="relative w-full rounded-md border border-red-600 bg-red-200 px-3 py-2 text-gray-900 dark:border-red-700/40 dark:bg-red-600/20 dark:text-gray-300"
          role="alert"
        >
          <span className="flex items-center gap-1">
            <TriangleAlert
              className="text-gray-900 dark:text-gray-300"
              size={16}
            />{" "}
            {error}
          </span>
        </div>
      )}

      {success && <FormSuccess message={success} />}
    </form>
  );
}
