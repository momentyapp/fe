import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router";

import API from "~/apis";
import SessionContext from "~/contexts/session";

import type { Topic, MomentConfig, PhotoFile } from "common";

export default function useWriteState() {
  const session = useContext(SessionContext);
  const navigate = useNavigate();

  const lastTimeout = useRef<NodeJS.Timeout>(null);

  const [text, setText] = useState("");
  const [topics, setTopics] = useState<Topic[]>([]);
  const [generatedKnwonTopics, setGeneratedKnownTopics] = useState<Topic[]>([]);
  const [generatedUnknownTopics, setGeneratedUnknownTopics] = useState<
    string[]
  >([]);
  const [config, setConfig] = useState<MomentConfig>({
    expiresIn: 24,
    anonymous: session.session === undefined,
  });
  const [photos, setPhotos] = useState<PhotoFile[]>([]);
  const [posting, setPosting] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  function handleTextChange(value: string) {
    setText(value);

    if (lastTimeout.current !== null) clearTimeout(lastTimeout.current);

    lastTimeout.current = setTimeout(async () => {
      if (value.length >= 10 && value.length <= 1000) {
        const response = await API.ai.getTopicRecommendation({ text: value });
        const { code, message, result } = response.data;

        if (code === "success" && result !== undefined) {
          setGeneratedKnownTopics(result.known);
          setGeneratedUnknownTopics(result.unknown);
        }
      } else {
        setGeneratedKnownTopics([]);
        setGeneratedUnknownTopics([]);
      }
    }, 1000);
  }

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
    setText: handleTextChange,
    topics,
    setTopics,
    generatedKnwonTopics,
    setGeneratedKnownTopics,
    generatedUnknownTopics,
    setGeneratedUnknownTopics,
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
