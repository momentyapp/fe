import { axiosInstance as axios } from "~/apis";
import type { ApiResponse } from "common";

interface Props {
  username: string;
  password: string;
  photo?: File;
}

type Response = ApiResponse;

export default async function signup({ username, password, photo }: Props) {
  const formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);
  if (photo) formData.append("photo", photo);

  const result = await axios.post<Response>("/user", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return result;
}
