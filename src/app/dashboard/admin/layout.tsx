import { SessionProvider } from "next-auth/react";
import { auth } from "@/server/auth";
import { RoleGate } from "@/components/rolegate";
import { USERROLE } from "@prisma/client";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <RoleGate allowedRoles={USERROLE.ADMIN}>
        <main className="flex w-full flex-col">{children}</main>
      </RoleGate>
    </SessionProvider>
  );
}
