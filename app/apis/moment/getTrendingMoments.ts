import axios from "~/apis";
import type { ApiResponse, Moment } from "common";

interface Props {
  start: number;
}

type Response = ApiResponse<{
  count: number;
  moments: Moment[];
}>;

export default async function getTrendingMoments({ start }: Props) {
  const result = await axios.get<Response>("/moment/trend", {
    params: {
      start,
    },
  });
  return result;
}
