import { axiosInstance as axios } from "~/apis";
import type { ApiResponse, Moment } from "common";

interface Props {
  momentIds: number[];
}

type Response = ApiResponse<{
  moments: Moment[];
}>;

export default async function getMomentByIds(
  { momentIds }: Props,
  accessToken?: string
) {
  const result = await axios.post<Response>(
    "/moment/getByIds",
    { momentIds },
    {
      headers:
        accessToken !== undefined
          ? {
              Authorization: `Bearer ${accessToken}`,
            }
          : undefined,
    }
  );
  return result;
}
