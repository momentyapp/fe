import { useContext, useState } from "react";
import { useNavigate } from "react-router";

import WriteBar from "~/components/WriteBar";
import WriteBody from "~/components/WriteBody";
import WriteFloatingBar from "~/components/WriteFloatingBar";
import PostConfirmModal from "~/components/PostConfirmModal";
import SessionContext from "~/contexts/session";

import type { PhotoFile, MomentConfig, Topic, Moment } from "common";

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
        onPost={() => {
          // TODO: 게시 요청
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
            const moment: Moment = {
              id: 123,
              author: !config.anonymous ? session.session?.user : undefined,
              createdAt: new Date().toISOString(),
              body: {
                text,
                photos: photos.map((photo) => photo.id),
              },
              topics,
              reactions: {},
              expiresAt: config.expiresIn
                ? new Date(
                    Date.now() + config.expiresIn * 60 * 60 * 1000
                  ).toISOString()
                : undefined,
            };

            navigate("/", {
              state: {
                postedMoment: moment,
              },
            });
          }, 2000);
        }}
      />
    </>
  );
}
