"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { TriangleAlert } from "lucide-react";
import { Loader } from "lucide-react";
import { forgotSchema } from "@/schemas";
import { Button } from "@/components/ui/button";
import { FormSuccess } from "../../components/FormSuccess";
import { ResetPass } from "@/action/resetform";
import Link from "next/link";
import Image from 'next/image';

type formValues = z.infer<typeof forgotSchema>;

export default function form() {
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<formValues>({
    resolver: zodResolver(forgotSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: formValues) => {
    setDisabled(true);
    setLoading(true);
    setError(null);
    setSuccess(null);

    // TODO: Call your API here
    await ResetPass(data.email).then((res) => {
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
    <div className="flex min-h-dvh items-center justify-center md:min-h-screen">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-card py-8 px-4 shadow-sm rounded-lg sm:px-10">
          <div className="mb-6 text-center">
            
            <h2 className="mt-6 text-2xl font-semibold text-foreground">Forgot Password</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Enter your email and we&apos;ll send you instructions to reset your password
            </p>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <div>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-md border-input px-3 py-2 text-lg ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                {...register("email")}
              />
              {errors.email && (
                <div className="mt-1 text-sm text-destructive">
                  {errors.email.message}
                </div>
              )}
            </div>
            <Button
              type="submit"
              className="flex w-full justify-center"
              disabled={disabled}
            >
              {loading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? "Resetting..." : "Reset Password"}
            </Button>

            {error && (
              <div className="text-sm text-destructive">
                <TriangleAlert className="mr-1 inline h-4 w-4" />
                {error}
              </div>
            )}

            {success && <FormSuccess message={success} />}
          </form>

          <div className="mt-8 text-center text-sm">
            <span className="text-muted-foreground">Remember your password?</span>{" "}
            <Link href="/login" className="font-medium text-primary underline-offset-4 hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}