import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserStoreType {
  id: any;
  name: any;
  email: any;
  role: "admin" | "user";
  photoUrl?: any;
}

interface UserStore {
  user: UserStoreType | null;
  setUser: (user: UserStoreType) => void;
  getUser: () => UserStoreType | null;
  updateUser: (updatedInfo: Partial<UserStoreType>) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,
      setUser: (user) => set({ user }),
      getUser: () => get().user,
      updateUser: (updatedInfo) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updatedInfo } : null,
        })),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "user",
    },
  ),
);
