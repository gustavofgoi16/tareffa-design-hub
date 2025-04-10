
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { User, UserRole } from "@/types";

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  googleLogin: () => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Mock user data - would be replaced by API calls in a real application
const MOCK_USER: User = {
  id: "user-123",
  name: "Demo User",
  email: "demo@tareffa.com",
  plan: "STANDARD",
  role: "CLIENT",
  createdAt: new Date()
};

const MOCK_ADMIN: User = {
  id: "admin-123",
  name: "Admin User",
  email: "admin@tareffa.com",
  plan: "NONE",
  role: "ADMIN",
  createdAt: new Date()
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if user is stored in local storage
    const storedUser = localStorage.getItem("tareffa_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // This would be an API call in a real application
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      let loggedInUser;
      if (email === "admin@tareffa.com" && password === "password") {
        loggedInUser = MOCK_ADMIN;
      } else {
        loggedInUser = MOCK_USER;
      }
      
      setUser(loggedInUser);
      localStorage.setItem("tareffa_user", JSON.stringify(loggedInUser));
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    setLoading(true);
    try {
      // This would use OAuth in a real application
      await new Promise((resolve) => setTimeout(resolve, 500));
      setUser(MOCK_USER);
      localStorage.setItem("tareffa_user", JSON.stringify(MOCK_USER));
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      // This would be an API call in a real application
      await new Promise((resolve) => setTimeout(resolve, 500));
      const newUser: User = {
        ...MOCK_USER,
        name,
        email,
      };
      setUser(newUser);
      localStorage.setItem("tareffa_user", JSON.stringify(newUser));
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("tareffa_user");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, googleLogin, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
