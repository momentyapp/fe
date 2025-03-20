import { axiosInstance as axios } from "~/apis";
import type { ApiResponse } from "common";

type Response = ApiResponse<{
  count: number;
  topics: {
    id: number;
    name: string;
    trending?: boolean;
    usage?: number;
  }[];
}>;

export default async function getTrendingTopics(signal?: AbortSignal) {
  const result = await axios.get<Response>("/topic/trend", {
    signal,
  });
  return result;
}
