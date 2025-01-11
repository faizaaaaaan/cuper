"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download, User } from "lucide-react";
import { toast } from "sonner";
import { exportToExcel } from "@/action/xlsx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function UsersTable({ users }: any) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filteredUsers, setFilteredUsers] = React.useState(users);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);

    // Filter the users based on the search term
    const filtered = users.filter(
      (user: any) =>
        user.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        user.email.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const exportData = () => {
    toast("Exported data to as Excel file");
    exportToExcel(
      filteredUsers.length > 0 ? filteredUsers : users,
      "users_figscreen"
    );
  };

  return (
    <div className="flex flex-col gap-4 rounded-lg w-full md:w-[90%] lg:w-[80%]">
      <div className="flex justify-between gap-3">
        <div className="relative flex w-full items-center justify-start">
          <input
            type="text"
            placeholder="search by name or email"
            className="w-full rounded-lg border px-3 py-2 focus:border-muted-foreground focus:outline-none lg:w-[35%]"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <Button
          size={"xl"}
          onClick={() => exportData()}
          className="flex items-center gap-1"
        >
          <Download size={18} />
          Export
        </Button>
      </div>
      <div className="rounded-md border overflow-hidden">
        <div className="overflow-x-auto">
          <Table className="bg-white">
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Credits</TableHead>
                <TableHead className="text-right">Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers && filteredUsers.length > 0 ? (
                filteredUsers.map((user: any) => (
                  <TableRow key={user.email}>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Avatar className="w-7 h-7">
                          <AvatarImage src={user?.image} />
                          <AvatarFallback>
                            <User className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                        {user.name}
                      </div>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.credits}</TableCell>
                    <TableCell className="text-right">
                      {new Date(user.joinedAt).toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={2} className="text-center">
                    No results found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
