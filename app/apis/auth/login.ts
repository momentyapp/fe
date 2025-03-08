import { axiosInstance as axios } from "~/apis";
import type { ApiResponse } from "common";

interface Props {
  username: string;
  password: string;
}

interface Token {
  token: string;
  expiresAt: string;
}

type Response = ApiResponse<{
  user: {
    id: number;
    username: string;
    createdAt: string;
    photo?: string;
  };
  accessToken: Token;
  refreshToken: Token;
}>;

export default async function login({ username, password }: Props) {
  const result = await axios.post<Response>("/auth/login", {
    username,
    password,
  });
  return result;
}
