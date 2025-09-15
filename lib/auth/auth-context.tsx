"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { AuthUser, AuthTokens } from "@/lib/types";
import Cookies from "js-cookie";

interface AuthContextType {
  user: AuthUser | null;
  tokens: AuthTokens | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [tokens, setTokens] = useState<AuthTokens | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing auth on mount
    const savedTokens = Cookies.get("auth-tokens");
    const savedUser = Cookies.get("auth-user");

    if (savedTokens && savedUser) {
      try {
        setTokens(JSON.parse(savedTokens));
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Error parsing saved auth data:", error);
        Cookies.remove("auth-tokens");
        Cookies.remove("auth-user");
      }
    }

    setIsLoading(false);
  }, []);

  const login = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    try {
      setIsLoading(true);

      // Mock authentication - replace with actual API call
      if (username === "admin" && password === "admin123") {
        const mockUser: AuthUser = {
          id: "1",
          username: "admin",
          email: "admin@ehr-dashboard.com",
          role: "admin",
          permissions: ["read", "write", "delete", "admin"],
          lastLogin: new Date().toISOString(),
        };

        const mockTokens: AuthTokens = {
          accessToken: "mock-access-token",
          refreshToken: "mock-refresh-token",
          expiresIn: 3600,
        };

        setUser(mockUser);
        setTokens(mockTokens);

        // Save to cookies
        Cookies.set("auth-user", JSON.stringify(mockUser), { expires: 1 });
        Cookies.set("auth-tokens", JSON.stringify(mockTokens), { expires: 1 });

        return true;
      }

      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setTokens(null);
    Cookies.remove("auth-user");
    Cookies.remove("auth-tokens");
  };

  const value: AuthContextType = {
    user,
    tokens,
    login,
    logout,
    isLoading,
    isAuthenticated: !!user && !!tokens,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
