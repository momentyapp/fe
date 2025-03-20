import type { AxiosResponse } from "axios";
import type { ApiResponse } from "common";

export default function selectAPIResult<T>(
  data: AxiosResponse<ApiResponse<T>, any>
) {
  if (data.data.code !== "success" || data.data.result === undefined)
    throw new Error(data.data.code);
  return data.data.result;
}
