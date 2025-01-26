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

  // cookie에서 session을 가져옴
  useEffect(() => {
    const cookies = new Cookies();
    try {
      const session = JSON.parse(cookies.get("session"));

      function isSession(session: any): session is SessionType {
        return session?.user && session?.accessToken && session?.refreshToken;
      }

      if (isSession(session)) {
        setSession({ session });
      }
    } catch (e) {}
  }, []);

  // session이 변경되면 cookie에 저장
  useEffect(() => {
    if (session.session === undefined) return;

    const cookies = new Cookies();
    cookies.set("session", JSON.stringify(session.session), {
      expires: new Date(session.session?.accessToken.expiresAt),
    });
  }, [session]);

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
