import React, { Suspense } from "react";
import { Loader } from "lucide-react";
import Link from "next/link";
import GoogleButton from "../components/google";
import RegisterForm from "../components/register";

function App() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-dvh items-center justify-center md:min-h-screen">
          <Loader className="animate-spin" />{" "}
        </div>
      }
    >
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-sm rounded-lg sm:px-10">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-semibold">Create an account</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Enter your details to get started
            </p>
          </div>
          
          <RegisterForm />

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#ECEDF0]" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6">
              <GoogleButton />
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-black hover:text-black/90 font-medium"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </Suspense>
  );
}

export default App;
