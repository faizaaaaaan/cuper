"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Video, LayoutGrid, CreditCard, Settings, BarChart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const routes = [
  {
    label: "Create",
    icon: Video,
    href: "/dashboard",
  },
  {
    label: "Projects",
    icon: LayoutGrid,
    href: "/dashboard/projects",
  },
  {
    label: "Analytics",
    icon: BarChart,
    href: "/dashboard/analytics",
    badge: "soon"
  },
  {
    label: "Billing",
    icon: CreditCard,
    href: "/dashboard/pricing",
  },
];

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div className={cn("flex flex-col h-full bg-background border-r", className)}>
      <div className="px-6 py-8">
        <Link href="/dashboard">
          <div className="flex items-center">
            <Image
              src="/logo.svg"
              alt="Createreel Logo"
              width={150}
              height={40}
              className="object-contain"
              priority={true}
            />
          </div>
        </Link>
      </div>
      <div className="flex-1 pl-3 py-2">
        <nav className="space-y-1">
          {routes.map((route) => {
            const isActive = pathname === route.href;
            return (
              <Link
                key={route.href}
                href={route.badge ? "#" : route.href}
                className={cn(
                  "flex items-center gap-x-3 text-sm text-zinc-500 py-3 px-3 rounded-lg relative group",
                  isActive && "text-zinc-900 bg-muted/50",
                  route.badge && "cursor-not-allowed opacity-80"
                )}
                onClick={route.badge ? (e) => e.preventDefault() : undefined}
              >
                <route.icon className={cn(
                  "h-5 w-5",
                  isActive && "text-zinc-900"
                )} />
                <span className="font-medium">{route.label}</span>
                {route.badge && (
                  <span className="ml-auto text-xs font-medium text-primary">
                    {route.badge}
                  </span>
                )}
                {isActive && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-l-full" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="p-3 mt-auto">
        <Link 
          href="/dashboard/affiliate"
          className={cn(
            "flex items-center gap-x-3 text-sm text-zinc-500 py-3 px-3 rounded-lg mb-2",
            pathname === "/dashboard/affiliate" && "text-zinc-900 bg-muted/50"
          )}
        >
          <Share2 className="h-5 w-5" />
          <span className="font-medium">Affiliate Program</span>
        </Link>
        <Link 
          href="/dashboard/settings"
          className={cn(
            "flex items-center gap-x-3 text-sm text-zinc-500 py-3 px-3 rounded-lg",
            pathname === "/dashboard/settings" && "text-zinc-900 bg-muted/50"
          )}
        >
          <Settings className="h-5 w-5" />
          <span className="font-medium">Settings</span>
        </Link>
      </div>
    </div>
  );
}