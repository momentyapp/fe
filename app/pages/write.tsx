import { useContext, useState } from "react";
import { useNavigate } from "react-router";

import WriteBar from "~/components/WriteBar";
import WriteBody from "~/components/WriteBody";
import WriteFloatingBar from "~/components/WriteFloatingBar";
import SessionContext from "~/contexts/session";

import type { PhotoFile, MomentConfig, Topic } from "common";

const sampleTopics: Topic[] = [
  { topic: "매일우유", id: 0, count: 232532, trending: true },
  { topic: "국회의사당역", id: 1, count: 65342 },
  { topic: "탄핵", id: 2, count: 30012 },
  { topic: "양자컴퓨터", id: 6, count: 9232 },
  { topic: "엔비디아", id: 7, count: 8923 },
  { topic: "삼성", id: 8, count: 2342 },
];

export default function Write() {
  const session = useContext(SessionContext);
  const navigate = useNavigate();

  const [text, setText] = useState("");
  const [topics, setTopics] = useState<Topic[]>(sampleTopics);
  const [config, setConfig] = useState<MomentConfig>({
    expiresIn: 24,
    anonymous: session.session === undefined,
  });
  const [photos, setPhotos] = useState<PhotoFile[]>([]);

  function handlePost() {
    // TODO: 구현
    navigate(-1);
  }

  return (
    <>
      {/* 상단 바 */}
      <WriteBar onPost={handlePost} />

      {/* 본문 */}
      <WriteBody
        value={text}
        onChange={setText}
        photos={photos}
        onPhotosChange={setPhotos}
      />

      {/* 하단 바 */}
      <WriteFloatingBar
        topics={topics}
        setTopics={setTopics}
        config={config}
        setConfig={setConfig}
        onPost={handlePost}
      />
    </>
  );
}
