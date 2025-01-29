import { useContext, useState } from "react";
import { useNavigate } from "react-router";

import WriteBar from "~/components/WriteBar";
import WriteBody from "~/components/WriteBody";
import WriteFloatingBar from "~/components/WriteFloatingBar";
import PostConfirmModal from "~/components/PostConfirmModal";
import SessionContext from "~/contexts/session";

import type { PhotoFile, MomentConfig, Topic, Moment } from "common";
import API from "~/apis";

export default function Write() {
  const session = useContext(SessionContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [config, setConfig] = useState<MomentConfig>({
    expiresIn: 24,
    anonymous: session.session === undefined,
  });
  const [photos, setPhotos] = useState<PhotoFile[]>([]);

  function handlePost() {
    setConfirmModalOpen(true);
  }

  async function handleConfirmPost() {
    // TODO: 게시 요청
    setLoading(true);

    const response = await API.moment.postMoment(
      {
        text,
        photos: photos.map((photo) => photo.file),
        topicIds: topics.map((topic) => topic.id),
        expiresIn: config.expiresIn,
      },
      config.anonymous ? session.session?.accessToken.token : undefined
    );
    const { code, message, result } = response.data;

    if (code === "success" && result !== undefined) {
      navigate("/", {
        state: {
          postedMomentId: result.momentId,
        },
      });
    }

    setLoading(false);
    setConfirmModalOpen(false);
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

      {/* 게시 확인 모달 */}
      <PostConfirmModal
        expiresIn={config.expiresIn}
        anonymous={config.anonymous}
        isOpen={confirmModalOpen}
        onRequestClose={() => setConfirmModalOpen(false)}
        loading={loading}
        onPost={handleConfirmPost}
      />
    </>
  );
}
