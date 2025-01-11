"use client";

import { Sidebar } from "@/components/sidebar";

interface ClientLayoutProps {
  children: React.ReactNode;
}

export function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden ">
      {/* Sidebar - hidden on mobile, visible on md+ screens */}
      <aside className="hidden md:flex md:w-64 lg:w-72 flex-shrink-0">
        <Sidebar className="w-full border-r border-[#ECEDF0] bg-white" />
      </aside>

      {/* Main content area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        
        <main className="flex-1 pt-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}