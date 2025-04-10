
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  LayoutDashboard,
  PlusCircle,
  ListChecks,
  Package,
  ShieldCheck,
  Users,
} from "lucide-react";

export function Sidebar() {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (!user) return null;

  const isClient = user.role === "CLIENT";
  const isActive = (path: string) => location.pathname === path;

  const menuItems = isClient
    ? [
        {
          icon: LayoutDashboard,
          label: "Dashboard",
          href: "/dashboard",
        },
        {
          icon: PlusCircle,
          label: "New Order",
          href: "/orders/new",
        },
        {
          icon: ListChecks,
          label: "My Orders",
          href: "/orders",
        },
        {
          icon: Package,
          label: "My Plan",
          href: "/plan",
          badge: user.plan,
        },
      ]
    : [
        {
          icon: LayoutDashboard,
          label: "Dashboard",
          href: "/admin",
        },
        {
          icon: ListChecks,
          label: "Orders",
          href: "/admin/orders",
        },
        {
          icon: Users,
          label: "Clients",
          href: "/admin/clients",
        },
        {
          icon: ShieldCheck,
          label: "Plans",
          href: "/admin/plans",
        },
      ];

  return (
    <aside className="hidden md:flex h-[calc(100vh-4rem)] w-60 flex-col border-r bg-background">
      <div className="flex flex-col gap-2 p-4">
        <div className="flex items-center gap-2 px-2 py-1.5 mb-4">
          <span className="text-sm font-semibold">
            {isClient ? "Client Portal" : "Admin Portal"}
          </span>
        </div>
        <nav className="flex flex-col gap-1">
          {menuItems.map((item) => (
            <button
              key={item.href}
              onClick={() => navigate(item.href)}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive(item.href)
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
              {item.badge && (
                <Badge variant="outline" className="ml-auto text-xs">
                  {item.badge}
                </Badge>
              )}
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
}
