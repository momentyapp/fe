import { createContext, useEffect, useState } from "react";
import { Cookies } from "react-cookie";

import API from "~/apis";

import type { Token, User } from "common";

interface SessionValues {
  user?: User;
  accessToken?: Token;
  refreshToken?: Token;
}

interface SessionActions {
  setUser: (user?: User) => void;
  setAccessToken: (accessToken?: SessionValues["accessToken"]) => void;
  setRefreshToken: (refreshToken?: SessionValues["refreshToken"]) => void;

  login: (user: User, accessToken: Token, refreshToken: Token) => void;
  logout: () => void;
}

export type Session = SessionValues & SessionActions;

const defaultValue: Session = {
  user: undefined,
  accessToken: undefined,
  refreshToken: undefined,

  setUser: () => {},
  setAccessToken: () => {},
  setRefreshToken: () => {},

  login: () => {},
  logout: () => {},
};

const SessionContext = createContext<Session>(defaultValue);
const cookies = new Cookies();

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<SessionValues>(defaultValue);

  // cookie에서 refresh token을 가져와 새 토큰을 발급받는 함수
  async function getRefreshToken() {
    try {
      const refreshToken = cookies.get("refresh_token");

      // 새로운 토큰 발급
      if ("token" in refreshToken && typeof refreshToken.token === "string") {
        const response = await API.auth.refreshToken({
          refreshToken: refreshToken.token,
        });
        const { code, result, message } = response.data;

        if (code === "success" && result !== undefined) {
          setSession((prev) => ({
            ...prev,
            ...result,
          }));
        }
      }
    } catch (e) {}
  }

  useEffect(() => {
    getRefreshToken();
  }, []);

  return (
    <SessionContext.Provider
      value={{
        ...session,

        // setUser
        setUser: (user) => setSession((prev) => ({ ...prev, user })),

        // setAccessToken
        setAccessToken: (accessToken) =>
          setSession((prev) => ({ ...prev, accessToken })),

        // setRefreshToken
        setRefreshToken: (refreshToken) =>
          setSession((prev) => ({ ...prev, refreshToken })),

        // login
        login: (user, accessToken, refreshToken) => {
          cookies.set("refresh_token", refreshToken, {
            expires: new Date(refreshToken.expiresAt),
          });
          setSession({ user, accessToken, refreshToken });
        },

        // logout
        logout: () => {
          cookies.remove("refresh_token");
          setSession(defaultValue);
        },
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export default SessionContext;
