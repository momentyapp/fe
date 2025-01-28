import axios from "~/apis";
import type { ApiResponse } from "common";

interface Props {
  text: string;
  topicIds: number[];
  expiresIn?: number;
  photos?: File[];
}

type Response = ApiResponse<{
  topicId: number;
}>;

export default async function postMoment(
  { text, topicIds, expiresIn, photos }: Props,
  accessToken: string
) {
  const formData = new FormData();
  formData.append("text", text);
  formData.append("topicIds", JSON.stringify(topicIds));
  if (expiresIn) formData.append("expiresIn", expiresIn.toString());
  if (photos) {
    photos.forEach((photo) => {
      formData.append("photos", photo);
    });
  }

  const result = await axios.post<Response>("/moment", formData);
  return result;
}
