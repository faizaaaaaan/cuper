import { Video, History, CreditCard, Settings, Layers } from "lucide-react";

export const routes = [
  {
    label: "Create",
    icon: Video,
    href: "/dashboard",
  },
  {
    label: "Bulk Create",
    icon: Layers,
    href: "/dashboard/bulk",
  },
  {
    label: "History",
    icon: History,
    href: "/dashboard/history",
  },
  {
    label: "Pricing",
    icon: CreditCard,
    href: "/dashboard/pricing",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
  },
] as const;