import React, { Suspense } from "react";
import { Loader } from "lucide-react";
import Link from "next/link";
import LoginForm from "../components/login";
import GoogleButton from "../components/google";

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
        <div className="bg-card py-8 px-4 shadow-sm rounded-lg sm:px-10">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-semibold text-foreground">Welcome back</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Enter your email to sign in to your account
            </p>
          </div>
          <LoginForm />

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-card text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
          </div>

          <GoogleButton />

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="text-foreground hover:text-foreground/90 font-medium"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </Suspense>
  );
}

export default App;