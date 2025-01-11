"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSuccess } from "../../components/FormSuccess";
import { resetPasswordSchema } from "@/schemas";
import { TriangleAlert, EyeIcon, EyeOffIcon, Loader } from "lucide-react";
import { newPassword } from "@/action/new-password";

type formValues = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordForm() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [visiblePassword, setVisiblePassword] = useState(false);

  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<formValues>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onChange",
  });

  const togglePassword = () => {
    setVisiblePassword((prev) => !prev);
  };

  const onSubmit = async (data: formValues) => {
    setDisabled(true);
    setLoading(true);
    setError(null);
    setSuccess(null);

    // TODO: Call your API here
    await newPassword(data.password, token).then((res) => {
      if (res && res.error) {
        setError(res.error || "An error occurred");
        setLoading(false);
        setDisabled(false);
      } else {
        setSuccess(res.success || "Email sent successfully");
        setLoading(false);
        setDisabled(false);
      }
    });
  };

  return (
    <div className="mx-auto flex h-screen flex-col items-center justify-center px-4 py-8 lg:py-0">
      <div className="mx-auto w-full max-w-md rounded-sm bg-transparent p-3 shadow-input md:rounded-lg md:p-8">
        <img className="mb-8 h-8 w-8" src={"/fig.png"} alt="logo" />
        <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
          Forgot Password
        </h2>
        <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
          Enter a new password below and you are good to go.
        </p>

        <div className="my-4 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full flex-col items-center gap-4"
        >
          <div className="relative flex w-full items-center justify-center">
            <input
              id="password"
              type={visiblePassword ? "text" : "password"}
              placeholder="password"
              className="w-full rounded-md border p-2 px-3 pr-8 focus:border-muted-foreground focus:outline-none"
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
          {success ? (
            <Link href="/login" className="w-full">
              <Button className="flex w-full gap-1">Back to login</Button>
            </Link>
          ) : (
            <Button
              type="submit"
              className="flex w-full gap-1"
              disabled={disabled}
            >
              {loading && <Loader className="animate-spin" size={16} />}
              {!loading ? "Reset Password" : "Resetting..."}
            </Button>
          )}

          {errors && (
            <div
              className={
                errors.password ? "flex w-full flex-col gap-1" : "hidden"
              }
            >
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
      </div>
    </div>
  );
}
