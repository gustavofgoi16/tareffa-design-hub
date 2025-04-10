
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Loader2 } from "lucide-react";

interface AuthLayoutProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  adminOnly?: boolean;
}

export function AuthLayout({ 
  children, 
  requireAuth = true,
  adminOnly = false
}: AuthLayoutProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-background">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (requireAuth && !user) {
    return <Navigate to="/login" replace />;
  }

  if (!requireAuth && user) {
    return <Navigate to="/dashboard" replace />;
  }

  if (adminOnly && user?.role !== "ADMIN") {
    return <Navigate to="/dashboard" replace />;
  }

  return <div className="bg-background min-h-screen">{children}</div>;
}
