import { axiosInstance as axios } from "~/apis";

import type { ApiResponse, User } from "common";

interface Props {
  refreshToken: string;
}

type Response = ApiResponse<{
  user: User;
  accessToken: Token;
  refreshToken: Token;
}>;

interface Token {
  token: string;
  expiresAt: string;
}

export default async function refreshToken({ refreshToken }: Props) {
  const result = await axios.post<Response>("/auth/refresh", {
    refreshToken,
  });
  return result;
}
