"use client";

import { USERROLE } from "@prisma/client";
import { ChevronLeft, Skull } from "lucide-react";
import Link from "next/link";
import { useCurrentRole } from "@/hooks/use-current-role";
import { buttonVariants } from "@/components/ui/button";
import { toast } from "sonner";

interface RoleGateProps {
  children: React.ReactNode;
  allowedRoles: USERROLE;
}

export const RoleGate = ({ children, allowedRoles }: RoleGateProps) => {
  const role = useCurrentRole();

  if (role !== allowedRoles) {
    toast("😏 Nice try Buddy:) XDD");
    return (
      <main className="flex min-h-[100dvh] flex-col items-center justify-center space-y-10 text-center md:min-h-screen">
        <Skull size={100} className="text-red-500" />
        <div className="mt-3 space-y-2">
          <h1 className="text-xl font-medium">Sorry! You are not authorized</h1>
          <p>
            It looks like you&apos;ve reached a URL that you can&apos;t visit.
          </p>
        </div>
        <Link href={"/dashboard"} className={buttonVariants({ variant: "default" })}>
          <ChevronLeft /> Go back to home
        </Link>
      </main>
    );
  }
  return <>{children}</>;
};
