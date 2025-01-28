import axios from "~/apis";

interface Props {
  topic: string;
}

export default async function createTopic({ topic }: Props) {
  return await axios.post("/topics", { topic });
}
