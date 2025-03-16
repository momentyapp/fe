import { axiosInstance as axios } from "~/apis";
import type { ApiResponse, Topic } from "common";

interface Props {
  text: string;
}

type Response = ApiResponse<{
  count: number;
  topics: {
    id?: number;
    name: string;
    trending?: boolean;
    score: number;
    usage?: number;
    known: boolean;
  }[];
}>;

export default async function generateTopics(
  { text }: Props,
  signal?: AbortSignal
) {
  const result = await axios.get<Response>("/topic/generate", {
    params: {
      text,
    },
    signal,
  });
  return result;
}
