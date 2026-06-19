import { User } from "@/types/user";
import { create } from "zustand";

interface UserToken {
  user: User | null;
  isAuth: boolean;
  setUser: (user: User) => void;
  clearUser: () => void;
}

export const useUserToken = create<UserToken>()((set) => {
  return {
    user: null,
    isAuth: false,
    setUser: (newUser) => {
      set({ user: newUser, isAuth: true });
    },
    clearUser: () => {
      set({ user: null, isAuth: false });
    },
  };
});
