import axios from "~/apis";
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

export default async function createTopic() {
  const result = await axios.get<Response>("/topics/trend");
  return result;
}
