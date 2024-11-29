import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface Tenant {
  id: number;
  name: string;
  address: string;
}
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  tenant?: Tenant;
}

interface AuthState {
  user: null | User;
  setUser: (user: User) => void;
  logout: () => void;
}

//Authstate here is the return type of userAuthStore
// Zustand store
export const userAuthStore = create<AuthState>()(
  devtools((set) => ({
    user: null,
    setUser: (user: User) => set({ user }),
    logout: () => set({ user: null }),
  }))
);
