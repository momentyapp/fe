import { axiosInstance as axios } from "~/apis";
import type { ApiResponse, Moment } from "common";

interface Props {
  momentId: number;
}

type Response = ApiResponse<{
  moment: Moment;
}>;

export default async function getMomentById({ momentId }: Props) {
  const result = await axios.get<Response>("/moment/getById", {
    params: {
      momentId,
    },
  });
  return result;
}
