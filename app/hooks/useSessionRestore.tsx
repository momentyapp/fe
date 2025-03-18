import { useEffect } from "react";
import { Cookies } from "react-cookie";

import useSession from "~/contexts/useSession";
import API from "~/apis";

import type { Token } from "common";

/**
 * @description 세션 복원 후 로그인 처리를 하는 훅
 */
export default function useSessionRestore() {
  const session = useSession();

  useEffect(() => {
    (async () => {
      const restoredSession = await restoreSession();
      if (restoredSession === null) return;
      session.login(
        restoredSession.user,
        restoredSession.accessToken,
        restoredSession.refreshToken
      );
    })();
  }, []);
}

async function restoreSession() {
  const cookies = new Cookies();

  // 쿠키에서 refreshToken 가져오기
  const refreshToken = cookies.get("refreshToken");
  if (!isToken(refreshToken)) return null;

  // 토큰 재발급받기
  const response = await API.auth.refreshToken({
    refreshToken: refreshToken.token,
  });
  const { code, result, message } = response.data;

  // 토큰 및 사용자 정보 반환
  if (code === "success" && result !== undefined) {
    return result;
  }
  return null;
}

function isToken(obj: any): obj is Token {
  if (obj === null || typeof obj !== "object") return false;
  if (!("token" in obj) || typeof obj.token !== "string") return false;
  if (!("expiresAt" in obj) || typeof obj.expiresAt !== "string") return false;
  return true;
}
