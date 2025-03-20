import type { AxiosResponse } from "axios";
import type { ApiResponse } from "common";

export default function selectAPIResult<T, D>(
  data: AxiosResponse<ApiResponse<T>, D>
) {
  if (data.data.code !== "success" || data.data.result === undefined)
    throw new Error(data.data.code);
  return data.data.result;
}
