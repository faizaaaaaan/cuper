import React from "react";
import { currentRole } from "@/server/user";
import { adminUsersData } from "@/server/userdata";
import { UsersTable } from "./components/userstbl";

export default async function AdminPage() {
  const users = await adminUsersData();

  return (
    <div className="flex flex-col items-center w-full mx-auto">
      <UsersTable users={users} />
    </div>
  );
}
