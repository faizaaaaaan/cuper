"use client";

import { Coins, Loader } from "lucide-react";
import React, { Suspense, useEffect, useState } from "react";

export default function Credits({ user }: { user: any }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  const credits = user?.credits || 0;
  return (
    <Suspense
      fallback={
        <div className="flex min-h-dvh items-center justify-center md:min-h-screen">
          <Loader className="animate-spin" />{" "}
        </div>
      }
    >
      <div className="flex items-center gap-x-1">
        <Coins className="h-4 w-4" />
        <span>{credits}</span>
      </div>
    </Suspense>
  );
}
