import React, { Suspense } from "react";
import { DeleteDialog } from "./deletedialog";
import { Loader } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function DeleteAccount(user: any) {
  const userId = user.user.id;
  return (
    <Card className="border-0 shadow-none">
      <CardHeader className="space-y-1 px-0">
        <div className="flex items-center space-x-2">
          <CardTitle className="text-red-500">Delete Account</CardTitle>
        </div>
        <CardDescription>
          Permanently remove your account and all associated data
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 px-0">
        <div className="flex items-center justify-between bg-destructive/15 p-2 px-4 rounded-lg overflow-hidden">
          <p className="text-sm text-black/80">
            This action is irreversible, please be sure before proceeding.
          </p>

          <Suspense fallback={<Loader className="h-5 w-5 animate-spin" />}>
            <DeleteDialog userId={userId ?? ""} />
          </Suspense>
        </div>
      </CardContent>
    </Card>
  );
}
