"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import AnimatedLoading from "@/components/loading";
import { Button } from "@/components/ui/button";
import { newVerification } from "@/action/new-verification";
import Link from "next/link";
import { TriangleAlert } from "lucide-react";
import { FormSuccess } from "../../components/FormSuccess";

export default function verificationform() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [disabled, setDisabled] = useState<boolean>(true);

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (!token) {
      setError("Token not found");
      return;
    }

    newVerification(token).then((res) => {
      if (res && res.error) {
        setError(res.error || "An error occurred");
        setDisabled(false);
      } else {
        setSuccess(res.success || "User has been registered");
        setDisabled(false);
      }
    });
  }, []);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);
  return (
    <div className="mx-auto flex h-screen flex-col items-center justify-center px-4 py-8 lg:py-0">
      <div className="mx-auto w-full max-w-md rounded-sm bg-transparent p-3 shadow-input md:rounded-lg md:p-8">
        <img className="mb-8 h-8 w-8" src={"/fig.png"} alt="logo" />
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
            Get Verified
          </h2>
        </div>
        <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
          Give us a moment to verify your account
        </p>

        <div className="my-4 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

        <div className="mb-2 flex w-full flex-col items-center justify-center gap-10">
          {!error && !success && <AnimatedLoading size={30} />}
          {disabled ? (
            <Button disabled={disabled} className="mt-10 w-full">
              Login Now
            </Button>
          ) : (
            <Link href="/login" className="w-full">
              <Button disabled={disabled} className="mt-10 w-full">
                Login Now
              </Button>
            </Link>
          )}
        </div>

        <div className="flex flex-col gap-2">
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
        </div>
      </div>
    </div>
  );
}
