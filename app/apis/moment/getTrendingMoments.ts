import { axiosInstance as axios } from "~/apis";
import type { ApiResponse, Moment } from "common";

interface Props {
  start: number;
}

type Response = ApiResponse<{
  count: number;
  moments: Moment[];
}>;

export default async function getTrendingMoments(
  { start }: Props,
  accessToken?: string
) {
  const result = await axios.get<Response>("/moment/trend", {
    params: {
      start,
    },
    headers:
      accessToken !== undefined
        ? {
            Authorization: `Bearer ${accessToken}`,
          }
        : undefined,
  });
  return result;
}
