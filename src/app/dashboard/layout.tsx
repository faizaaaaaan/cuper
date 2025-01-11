
import { auth } from "@/server/auth";
import { SessionProvider } from "next-auth/react";
import { ClientLayout } from "./components/client-layout";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <ClientLayout>{children}</ClientLayout>
    </SessionProvider>
  );
}
