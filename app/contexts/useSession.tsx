import { create } from "zustand";
import { Cookies } from "react-cookie";

import type { Token, User } from "common";

interface States {
  user: User | null;
  accessToken: Token | null;
  refreshToken: Token | null;
}

interface Actions {
  setUser: (user: User) => void;
  setAccessToken: (accessToken: Token | null) => void;
  setRefreshToken: (refreshToken: Token | null) => void;

  login: (user: User, accessToken: Token, refreshToken: Token) => void;
  logout: () => void;
}

export type Session = States & Actions;

const cookies = new Cookies();

const useSession = create<Session>((set) => ({
  user: null,
  accessToken: null,
  refreshToken: null,

  setUser: (user) => set({ user }),
  setAccessToken: (accessToken) => set({ accessToken }),
  setRefreshToken: (refreshToken) => set({ refreshToken }),

  login: (user, accessToken, refreshToken) => {
    set({ user, accessToken, refreshToken });

    cookies.set("refreshToken", refreshToken, { path: "/" });
  },

  logout: () => {
    set({ user: null, accessToken: null, refreshToken: null });

    cookies.remove("refreshToken", { path: "/" });
  },
}));

export default useSession;
