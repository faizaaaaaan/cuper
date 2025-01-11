import React, { Suspense } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { useSession } from "next-auth/react";

export default function LandingAuthBtn() {
  const session = useSession();
  return (
    <Suspense
      fallback={
        <div className="flex w-full">
          <Skeleton className="h-10 w-32 rounded-md" />
        </div>
      }
    >
      {session && session.data !== null ? (
        <Link href={"/dashboard"}>
          <Button>Dashboard</Button>
        </Link>
      ) : (
        <Link href={"/register"}>
          <Button>Get Started</Button>
        </Link>
      )}
    </Suspense>
  );
}
