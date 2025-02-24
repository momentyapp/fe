import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router";

import API from "~/apis";
import SessionContext from "~/contexts/session";

import type { Topic, GeneratedTopic, MomentConfig, PhotoFile } from "common";

export default function useWriteState() {
  const session = useContext(SessionContext);
  const navigate = useNavigate();

  const lastTimeout = useRef<NodeJS.Timeout>(null);
  const abortController = useRef<AbortController>(new AbortController());

  const [text, setText] = useState("");
  const [topics, setTopics] = useState<Topic[]>([]);
  const [generatedTopics, setGeneratedTopics] = useState<GeneratedTopic[]>([]);
  const [config, setConfig] = useState<MomentConfig>({
    expiresIn: 24,
    anonymous: session.session === undefined,
  });
  const [photos, setPhotos] = useState<PhotoFile[]>([]);
  const [posting, setPosting] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  // 본문 변경 디바운싱
  function handleTextChange(value: string) {
    abortController.current.abort();
    abortController.current = new AbortController();

    setText(value);

    if (lastTimeout.current !== null) clearTimeout(lastTimeout.current);

    // 1000ms 이후
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
    }, 1000);
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
  };
}
