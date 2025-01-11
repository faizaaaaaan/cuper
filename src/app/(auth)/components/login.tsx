"use client";

import { EyeIcon, EyeOffIcon, Loader, TriangleAlert } from "lucide-react";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { login } from "@/schemas";
import { toast } from "sonner";
import Link from "next/link";
import LoginUser from "@/action/login";
import { FormSuccess } from "./FormSuccess";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type formValues = z.infer<typeof login>;

export default function LoginForm() {
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<formValues>({
    resolver: zodResolver(login),
    mode: "onChange",
  });

  const onSubmit = async (data: formValues) => {
    setDisabled(true);
    setLoading(true);
    setError(null);
    setSuccess(null);

    // TODO: Call your API here
    await LoginUser({ data })
      .then((res) => {
        if (res && res.error) {
          setError(res.error || "An error occurred");
          setLoading(false);
          setDisabled(false);
        } else if (res && res.notVerified) {
          setSuccess(res.notVerified || "Email not verified");
          setLoading(false);
          setDisabled(false);
        } else {
          toast.success("Logged in successfully");
          setLoading(false);
          setDisabled(false);
        }
      })
      .finally(() => {
        router.refresh();
      });
  };

  const togglePassword = () => {
    setVisiblePassword((prev) => !prev);
  };

  return (
    <form
      className="mt-4 flex flex-col items-end gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex w-full flex-col items-end gap-4">
        <div className="flex w-full flex-col items-end gap-4">
          <div className="w-full">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              className="mt-1 bg-[#f7f7f7] border-0"
              required
              {...register("email")}
            />
          </div>
          <div className="w-full">
            <Label htmlFor="password">Password</Label>
            <div className="relative flex w-full items-center justify-center">
              <Input
                id="password"
                className="mt-1 bg-[#f7f7f7] border-0"
                required
                type={visiblePassword ? "text" : "password"}
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

          <Link
            href={"/forgot"}
            className="right-0 -mt-3 w-max cursor-pointer text-end text-xs text-muted-foreground underline"
          >
            Forgot Password?
          </Link>
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

      <Button className="flex w-full gap-1" type="submit" disabled={disabled}>
        {loading && <Loader className="animate-spin" size={15} />}
        Login
      </Button>

      {error && (
        <div
          className="relative w-full rounded-md border border-red-600 bg-red-200 px-3 py-2 text-gray-900 dark:border-red-700/40 dark:bg-red-600/20 dark:text-gray-300"
          role="alert"
        >
          <span className="flex items-center gap-1 text-sm">
            <TriangleAlert
              className="text-gray-900 dark:text-gray-300"
              size={14}
            />{" "}
            {error}
          </span>
        </div>
      )}

      {success && <FormSuccess message={success} />}
    </form>
  );
}
