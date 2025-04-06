import { useEffect, useState } from "react";
import { useTheme } from "styled-components";
import { AnimatePresence } from "motion/react";
import { MdTune } from "react-icons/md";

import TopicModal from "~/components/common/TopicModal";
import Topic from "~/components/feed/Topic";

import * as S from "./index.style";

import type { Topic as TopicType } from "common";

interface TopicContainerProps {
  topics: TopicType[];
  setTopics: React.Dispatch<React.SetStateAction<TopicType[]>>;
}

export default function TopicContainer({
  topics,
  setTopics,
}: TopicContainerProps) {
  const theme = useTheme();
  const [modalOpen, setModalOpen] = useState(false);

  // 주제 제거
  function removeTopic(topicId: number) {
    setTopics((prevTopics) =>
      prevTopics.filter((topic) => topic.id !== topicId)
    );
  }

  const [initialized, setInitialized] = useState(false);
  useEffect(() => setInitialized(true), []);

  return (
    <S.Wrapper>
      <S.AddTopic
        backgroundColor={theme.bg2}
        onClick={() => setModalOpen(true)}
      >
        <MdTune size="20" color={theme.grey1} />
      </S.AddTopic>

      <AnimatePresence initial={initialized}>
        {topics.map((topic) => (
          <Topic
            topic={topic.name}
            key={topic.id}
            onClick={() => removeTopic(topic.id)}
          />
        ))}
      </AnimatePresence>

      {/* 주제 모달 */}
      <TopicModal
        addedTopics={topics}
        setAddedTopics={setTopics}
        onRequestClose={() => setModalOpen(false)}
        isOpen={modalOpen}
      />
    </S.Wrapper>
  );
}
