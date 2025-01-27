import { createContext, useEffect, useState } from "react";
import { Cookies } from "react-cookie";

import type { Session as SessionType } from "common";

interface SessionValues {
  session?: SessionType;
}

interface SessionActions {
  setSession: (session: SessionValues["session"]) => void;
}

type Session = SessionValues & SessionActions;

const defaultValue: Session = {
  session: undefined,

  setSession: () => {},
};

const SessionContext = createContext<Session>(defaultValue);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<SessionValues>(defaultValue);

  // cookie에서 refresh token을 가져옴
  useEffect(() => {
    const cookies = new Cookies();
    try {
      const refreshToken = cookies.get("refresh_token");

      // TODO: 서버에서 refresh token을 검증하고, access token을 발급받아야 함
      if (typeof refreshToken === "string") {
        setSession({
          session: {
            user: {
              id: 1,
              username: "user",
              createdAt: "2021-10-01T00:00:00Z",
            },
            accessToken: {
              token: "access-token",
              expiresAt: "2021-10-01T00:00:00Z",
            },
            refreshToken: {
              token: refreshToken,
              expiresAt: "2021-10-01T00:00:00Z",
            },
          },
        });
      }
    } catch (e) {}
  }, []);

  return (
    <SessionContext.Provider
      value={{
        ...session,
        setSession: (session) => setSession((prev) => ({ ...prev, session })),
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export default SessionContext;
