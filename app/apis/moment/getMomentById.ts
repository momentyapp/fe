import { axiosInstance as axios } from "~/apis";
import type { ApiResponse, Moment } from "common";

interface Props {
  momentId: number;
}

type Response = ApiResponse<{
  moment: Moment;
}>;

export default async function getMomentById(
  { momentId }: Props,
  accessToken?: string
) {
  const result = await axios.get<Response>("/moment/getById", {
    params: {
      momentId,
    },
    headers:
      accessToken !== undefined
        ? {
            Authorization: `Bearer ${accessToken}`,
          }
        : undefined,
  });
  return result;
}
