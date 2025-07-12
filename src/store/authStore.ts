import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserProfile = {
  id: number | null;
  name: string | null;
  username: string | null;
  role: string | null;
  department: string | null;
  employeeNo: string | null;
};

type AuthStore = {
  token: string | null;
  userProfile: UserProfile | null;
  setToken: (token: string) => void;
  setUserProfile: (profile: UserProfile | null) => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      token: null,
      userProfile: null,
      setToken: (token) => {
        localStorage.setItem("token", token);
        set({ token: token });
      },
      setUserProfile: (profile) => set({ userProfile: profile }),
    }),
    {
      name: "auth-store",
    }
  )
);
