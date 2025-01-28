import axios from "~/apis";
import type { ApiResponse } from "common";

interface Props {
  momentId: number;
  emoji: string | null;
}

type Response = ApiResponse<{
  reactions: {
    [reaction: string]: number;
  };
}>;

export default async function postMoment(
  { momentId, emoji }: Props,
  accessToken: string
) {
  const result = await axios.post<Response>(
    "/moment/reaction",
    {
      momentId,
      emoji,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return result;
}
