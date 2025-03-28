import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router";

import API from "~/apis";
import useSession from "~/contexts/useSession";

import type { Topic, GeneratedTopic, MomentConfig, PhotoFile } from "common";

export default function useWriteState() {
  const session = useSession();
  const navigate = useNavigate();

  const lastTimeout = useRef<NodeJS.Timeout>(null);
  const abortController = useRef<AbortController>(new AbortController());

  const [text, setText] = useState("");
  const [topics, setTopics] = useState<Topic[]>([]);
  const [generatedTopics, setGeneratedTopics] = useState<GeneratedTopic[]>([]);
  const [config, setConfig] = useState<MomentConfig>({
    expiresIn: 24,
    anonymous: session.user === undefined,
  });
  const [photos, setPhotos] = useState<PhotoFile[]>([]);
  const [posting, setPosting] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // 본문 변경 디바운싱
  function handleTextChange(value: string) {
    abortController.current.abort();
    abortController.current = new AbortController();

    setText(value);

    if (lastTimeout.current !== null) clearTimeout(lastTimeout.current);

    // 500ms 이후
    lastTimeout.current = setTimeout(async () => {
      if (value.length < 10 || value.length > 1000) {
        setGeneratedTopics([]);
        return;
      }

      // 주제 생성
      const response = await API.topic.generateTopics(
        { text: value },
        abortController.current.signal
      );
      const { code, message, result } = response.data;

      if (code === "success" && result !== undefined) {
        setGeneratedTopics(
          result.topics.filter((topic) =>
            topics.every((t) => t.name !== topic.name)
          )
        );
      }
    }, 500);
  }

  // 최종 게시하는 함수
  async function handleConfirmPost() {
    setPosting(true);

    const response = await API.moment.postMoment(
      {
        text,
        photos: photos.map((photo) => photo.file),
        topicIds: topics.map((topic) => topic.id),
        expiresIn: config.expiresIn,
      },
      !config.anonymous ? session.accessToken?.token : undefined
    );

    setPosting(false);
    setConfirmModalOpen(false);

    const { code, message, result } = response.data;

    if (code === "success" && result !== undefined) {
      navigate("/", {
        state: {
          postedMomentId: result.momentId,
        },
      });
    } else {
      setErrorMessage(message);
      setErrorModalOpen(true);
    }
  }

  return {
    text,
    setText: handleTextChange,
    topics,
    setTopics,
    generatedTopics,
    setGeneratedTopics,
    config,
    setConfig,
    photos,
    setPhotos,
    posting,
    confirmModalOpen,
    setConfirmModalOpen,
    handleConfirmPost,
    errorModalOpen,
    setErrorModalOpen,
    errorMessage,
  };
}
