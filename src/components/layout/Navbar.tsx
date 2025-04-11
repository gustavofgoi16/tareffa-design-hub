
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import Logo from "@/assets/logo/tareffa.svg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User, Settings, Search, Plus } from "lucide-react";

export function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="border-b bg-background sticky top-0 z-30">
      <div className="container flex h-14 items-center py-2 px-4">
        <div className="flex items-center gap-2 mr-4">
          <div onClick={() => navigate("/")} className="cursor-pointer flex items-center">
            <img
              src={Logo}
              alt="Tareffa Logo"
              className="h-8 w-auto"
            />
          </div>
        </div>

        {user && (
          <div className="flex items-center gap-2 border-r pr-4 mr-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-muted-foreground" 
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-muted-foreground" 
              onClick={() => navigate("/orders")}
            >
              Pedidos
            </Button>
          </div>
        )}
        
        <div className="flex-1 flex justify-end items-center space-x-2">
          {user ? (
            <>
              <Button variant="ghost" size="icon" className="text-muted-foreground">
                <Search className="h-5 w-5" />
              </Button>
              <Button 
                onClick={() => navigate("/orders/new")}
                variant="ghost" 
                className="hidden md:flex items-center gap-2 text-muted-foreground mr-2"
              >
                <Plus className="h-4 w-4" />
                <span>Novo Pedido</span>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} alt={user.name} />
                      <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/profile")}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Perfil</span>
                  </DropdownMenuItem>
                  {user.role === "ADMIN" && (
                    <DropdownMenuItem onClick={() => navigate("/admin")}>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Painel de Admin</span>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sair</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <Button onClick={() => navigate("/login")} variant="outline">
                Entrar
              </Button>
              <Button onClick={() => navigate("/register")}>Cadastrar</Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
