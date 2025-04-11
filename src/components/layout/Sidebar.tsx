
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
  Inbox,
  FileSpreadsheet,
  MoreHorizontal,
} from "lucide-react";

export function Sidebar() {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (!user) return null;

  const isActive = (path: string) => location.pathname === path;

  const menuItems = [
    {
      icon: Inbox,
      label: "Caixa de Entrada",
      href: "/inbox",
    },
    {
      icon: FileSpreadsheet,
      label: "Meus Pedidos",
      href: "/orders",
    },
    {
      divider: true,
    },
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      icon: ListChecks,
      label: "Todos os Pedidos",
      href: "/orders",
    },
    {
      icon: Package,
      label: "Meu Plano",
      href: "/plan",
      badge: user.plan,
    },
    {
      divider: true,
    },
    {
      icon: MoreHorizontal,
      label: "Mais",
      href: "#",
    },
  ];

  return (
    <aside className="hidden md:flex h-[calc(100vh-3.5rem)] w-64 flex-col border-r bg-background py-4">
      <div className="flex flex-col gap-1 px-3">
        <div className="flex items-center justify-between px-4 py-1.5 mb-2">
          <span className="text-sm font-medium text-muted-foreground">
            Tareffa
          </span>
        </div>
        <nav className="flex flex-col gap-1">
          {menuItems.map((item, index) => {
            if (item.divider) {
              return <div key={index} className="my-2 border-t border-border" />;
            }
            
            return (
              <button
                key={index}
                onClick={() => item.href && navigate(item.href)}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive(item.href)
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                {item.icon && <item.icon className="h-4 w-4" />}
                <span>{item.label}</span>
                {item.badge && (
                  <Badge variant="outline" className="ml-auto text-xs">
                    {item.badge}
                  </Badge>
                )}
              </button>
            );
          })}
        </nav>
      </div>
      
      <div className="mt-auto px-3">
        <div className="rounded-md border border-dashed border-muted-foreground/50 p-3 text-center">
          <div className="text-xs font-medium text-muted-foreground mb-2">
            Precisa de ajuda?
          </div>
          <button
            onClick={() => {}}
            className="w-full text-xs bg-primary text-primary-foreground py-1 px-2 rounded-md"
          >
            Contato
          </button>
        </div>
      </div>
    </aside>
  );
}
