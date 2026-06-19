"use client";

import { checkServerSession, getMe } from "@/lib/api/clientApi";

import { useUserToken } from "@/lib/store/authStore";
import { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const setUser = useUserToken((state) => state.setUser);
  const clearIsAuthenticated = useUserToken((state) => state.clearUser);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const isAuthenticated = await checkServerSession();
        if (!isAuthenticated) {
          clearIsAuthenticated();
          return;
        }
        const user = await getMe();

        if (user) setUser(user);
      } catch {
        clearIsAuthenticated();
      }
    };
    fetchUser();
  }, [setUser, clearIsAuthenticated]);

  return children;
};

export default AuthProvider;
