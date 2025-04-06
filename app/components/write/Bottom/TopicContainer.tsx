import React, { useState, useEffect } from "react";
import { useTheme } from "styled-components";
import { AnimatePresence, LayoutGroup } from "motion/react";
import { MdAdd } from "react-icons/md";

import TopicModal from "~/components/common/TopicModal";
import useGeneratedTopicHandler from "~/hooks/useGeneratedTopicHanlder";

import Topic from "./Topic";
import GeneratedTopic from "./GeneratedTopic";

import * as S from "./TopicContainer.style";

import type {
  Topic as TopicType,
  GeneratedTopic as GeneratedTopicType,
} from "common";

interface TopicContainerProps {
  topics: TopicType[];
  setTopics: React.Dispatch<React.SetStateAction<TopicType[]>>;
  generatedTopics: GeneratedTopicType[];
  setGeneratedTopics: React.Dispatch<
    React.SetStateAction<GeneratedTopicType[]>
  >;
}

export default function TopicContainer({
  topics,
  setTopics,
  generatedTopics,
  setGeneratedTopics,
}: TopicContainerProps) {
  const theme = useTheme();

  const { loadings, handleAddGeneratedTopic } = useGeneratedTopicHandler({
    setGeneratedTopics,
    setTopics,
  });

  const [modalOpen, setModalOpen] = useState(false);

  // 주제 삭제 함수
  function handleRemoveTopic(topic: TopicType) {
    setTopics((prevTopics) => prevTopics.filter((t) => t.id !== topic.id));
  }

  const [initialized, setInitialized] = useState(false);
  useEffect(() => setInitialized(true), []);

  return (
    <S.Wrapper>
      {/* 주제 추가 버튼 */}
      <S.AddTopicButton
        backgroundColor={theme.primary3}
        icon={<MdAdd size="20" color={theme.bg1} />}
        iconPosition="left"
        onClick={() => setModalOpen(true)}
      >
        <S.ButtonText color={theme.bg1}>직접 추가</S.ButtonText>
      </S.AddTopicButton>

      <LayoutGroup>
        <AnimatePresence initial={initialized} mode="popLayout">
          {/* 추가된 주제 */}
          {topics.map((topic) => (
            <Topic
              key={topic.id}
              topic={topic.name}
              onClick={() => handleRemoveTopic(topic)}
            />
          ))}

          {/* 생성된 주제 */}
          {generatedTopics.map((topic) => (
            <GeneratedTopic
              key={topic.name}
              topic={topic.name}
              onClick={() => handleAddGeneratedTopic(topic)}
              loading={loadings.has(topic.name)}
            />
          ))}
        </AnimatePresence>
      </LayoutGroup>

      <TopicModal
        addedTopics={topics}
        setAddedTopics={setTopics}
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
      />
    </S.Wrapper>
  );
}
