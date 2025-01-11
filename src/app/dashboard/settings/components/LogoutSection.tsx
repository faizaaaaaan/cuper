// app/dashboard/settings/components/LogoutSection.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { useState } from "react";

export default function LogoutSection() {
  const [error, setError] = useState<string | null>(null);

  const handleSignOut = async () => {
    try {
      await signOut({
        redirect: true,
        callbackUrl: "/",
      });
    } catch (error) {
      console.error("Sign out error:", error);
      setError("Failed to sign out. Please try again.");
    }
  };

  return (
    <Card className="border border-muted">
      <CardHeader>
        <CardTitle></CardTitle>
        <CardDescription>
          Sign out of your account securely. You will need to sign in again to access your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <Button
          variant="ghost"
          className="w-full justify-start text-zinc-500 hover:text-zinc-900 hover:bg-transparent"
          onClick={handleSignOut}
        >
          <LogOut className="h-5 w-5 mr-3" />
          <span className="font-medium">Logout</span>
        </Button>
      </CardContent>
    </Card>
  );
}