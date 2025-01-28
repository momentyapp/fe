import { axiosInstance as axios } from "~/apis";
import type { ApiResponse } from "common";

interface Props {
  query: string;
}

type Response = ApiResponse<{
  count: number;
  topics: {
    id: number;
    name: string;
    trending?: boolean;
    usage?: number;
  }[];
}>;

export default async function searchTopic({ query }: Props) {
  const result = await axios.get<Response>("/topics/search", {
    params: { query },
  });
  return result;
}
