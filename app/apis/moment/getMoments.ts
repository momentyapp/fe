import { axiosInstance as axios } from "~/apis";
import type { ApiResponse, Moment } from "common";

interface Props {
  topicIds: number[];
  before?: number;
}

type Response = ApiResponse<{
  count: number;
  moments: Moment[];
}>;

export default async function getMoments(
  { topicIds, before }: Props,
  signal?: AbortSignal
) {
  const result = await axios.post<Response>(
    "/moment/get",
    {
      topicIds,
      before,
    },
    {
      signal,
    }
  );
  return result;
}
