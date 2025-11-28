"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { authService } from "../api/services/auth";
import { getDeviceInfo } from "../utils/deviceInfo";
import { UserProfile } from "../types/userProfileTypes";

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean;
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  updateUser: (updates: Partial<UserProfile>) => void;
  updateUserAsync: (updates: Partial<UserProfile>) => Promise<void>;
  refreshUser: () => Promise<void>;
  setUser: (user: UserProfile | null) => void; 
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  const checkAuth = async () => {
    try {
      setIsLoading(true);
      const data = await authService.getProfile();
      setUser(data.data);
    } catch (error) {
      setUser(null);
    } finally {
      setIsLoading(false);
      setIsInitialized(true);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const device_info = await getDeviceInfo();
      const { data } = await authService.signIn({
        email,
        password,
        device_info,
      });
      if (data.user) {
        setUser(data.user);
      }
      return data;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
    }
  };

  const updateUser = (updates: Partial<UserProfile>) => {
    if (user) {
      setUser({
        ...user,
        ...updates,
      });
    }
  };

  const updateUserAsync = async (updates: Partial<UserProfile>) => {
    try {
      if (user) {
        setUser({
          ...user,
          ...updates,
        });
      }

      await refreshUser();
    } catch (error) {
      console.error("Failed to update user:", error);
      await checkAuth();
    }
  };

  const refreshUser = async () => {
    try {
      const data = await authService.getProfile();
      setUser(data.data);
    } catch (error) {
      console.error("Failed to refresh user:", error);
      throw error;
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        isInitialized,
        login,
        logout,
        checkAuth,
        updateUser,
        updateUserAsync,
        refreshUser,
        setUser,
      }}
    >
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
