import { useContext, useState } from "react";
import { useNavigate } from "react-router";

import API from "~/apis";
import SessionContext from "~/contexts/session";

import type { Topic, MomentConfig, PhotoFile } from "common";

export default function useWriteState() {
  const session = useContext(SessionContext);
  const navigate = useNavigate();

  const [text, setText] = useState("");
  const [topics, setTopics] = useState<Topic[]>([]);
  const [config, setConfig] = useState<MomentConfig>({
    expiresIn: 24,
    anonymous: session.session === undefined,
  });
  const [photos, setPhotos] = useState<PhotoFile[]>([]);
  const [posting, setPosting] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  async function handleConfirmPost() {
    setPosting(true);

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

    setPosting(false);
    setConfirmModalOpen(false);
  }

  return {
    text,
    setText,
    topics,
    setTopics,
    config,
    setConfig,
    photos,
    setPhotos,
    posting,
    confirmModalOpen,
    setConfirmModalOpen,
    handleConfirmPost,
  };
}
