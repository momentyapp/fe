import { axiosInstance as axios } from "~/apis";
import type { ApiResponse, Topic } from "common";

interface Props {
  text: string;
}

type Response = ApiResponse<{
  count: number;
  known: Topic[];
  unknown: string[];
}>;

export default async function getTopicRecommendation({ text }: Props) {
  const result = await axios.post<Response>("/ai/topic", {
    text,
  });
  return result;
}
