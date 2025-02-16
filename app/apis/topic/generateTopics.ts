import { axiosInstance as axios } from "~/apis";
import type { ApiResponse, Topic } from "common";

interface Props {
  text: string;
}

type Response = ApiResponse<{
  count: number;
  topics: {
    registered: boolean;
    id?: number;
    name: string;
    trending?: boolean;
    usage?: number;
  }[];
}>;

export default async function generateTopics({ text }: Props) {
  const result = await axios.get<Response>("/topic/generate", {
    params: {
      text,
    },
  });
  return result;
}
