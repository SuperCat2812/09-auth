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
      // Перевіряємо сесію
      const isAuthenticated = await checkServerSession();
      if (isAuthenticated) {
        // Якщо сесія валідна — отримуємо користувача
        const user = await getMe();
        if (user) setUser(user);
      } else {
        // Якщо сесія невалідна — чистимо стан
        clearIsAuthenticated();
      }
    };
    fetchUser();
  }, [setUser, clearIsAuthenticated]);

  return children;
};

export default AuthProvider;
