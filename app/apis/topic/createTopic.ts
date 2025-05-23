import { axiosInstance as axios } from "~/apis";
import type { ApiResponse } from "common";

interface Props {
  topic: string;
}

type Response = ApiResponse<{
  topicId: number;
}>;

export default async function createTopic({ topic }: Props) {
  const result = await axios.post<Response>("/topic", { topic });
  return result;
}
