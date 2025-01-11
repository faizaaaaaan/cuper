"use client";

import { redirect } from "next/navigation";

export default function HomePage() {
  console.log("Redirecting");
  redirect("/dashboard");
}
