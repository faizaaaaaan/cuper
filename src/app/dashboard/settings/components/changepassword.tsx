"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema } from "@/schemas";
import { TriangleAlert, EyeIcon, EyeOffIcon, Loader, Lock } from "lucide-react";
import { FormSuccess } from "@/app/(auth)/components/FormSuccess";
import { ChangePassword } from "@/action/changepassword";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type formValues = z.infer<typeof resetPasswordSchema>;

export default function ChangePasswordComp(user: any) {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [visiblePassword, setVisiblePassword] = useState(false);

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
    await ChangePassword(data.password, user.user.email).then((res) => {
      try {
        if (res && res.error) {
          setError(res.error || "An error occurred");
        } else {
          setSuccess(res.success ?? "Email sent successfully");
        }
      } finally {
        setLoading(false);
        setDisabled(false);
        reset();
      }
    });
  };

  return (
    <Card className="border-0 shadow-none">
      <CardHeader className="space-y-1 px-0">
        <div className="flex items-center space-x-2">
          <CardTitle>Change Password</CardTitle>
        </div>
        <CardDescription>
          Ensure your account is using a strong password
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 px-0">
        <div className="flex flex-col gap-2 p-2">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mb-4 flex flex-col gap-2 md:w-[80%] lg:w-[70%]"
          >
            <div className="flex flex-col md:flex-row gap-2">
              <div className="relative flex w-full items-center justify-center">
                <input
                  id="password"
                  type={visiblePassword ? "text" : "password"}
                  placeholder="Enter a new password"
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
              <Button
                type="submit"
                className="flex w-max gap-1"
                disabled={disabled}
              >
                {loading && <Loader className="animate-spin" size={16} />}
                {!loading ? "Change" : "Changing..."}
              </Button>
            </div>

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
      </CardContent>
    </Card>
  );
}
