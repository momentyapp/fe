import React, {
  useState,
  useContext,
  createRef,
  useMemo,
  useEffect,
} from "react";
import { styled, ThemeContext } from "styled-components";
import { MdAdd } from "react-icons/md";
import { Transition, TransitionGroup } from "react-transition-group";

import Button from "~/components/common/Button";
import Typography from "~/components/common/Typography";
import TopicModal from "~/components/common/TopicModal";

import Topic from "./Topic";
import GeneratedTopic from "./GeneratedTopic";

import type {
  Topic as TopicType,
  GeneratedTopic as GeneratedTopicType,
} from "common";
import API from "~/apis";

const Wrapper = styled(TransitionGroup)`
  display: flex;
  flex-direction: row;
  padding: 3px 10px;
  width: 100%;
  overflow-x: auto;
  box-sizing: border-box;
`;

const StyledButton = styled(Button)`
  height: 36px;
  padding: 0px 10px;
  justify-content: center;
  align-items: center;
  gap: 5px;
  border-radius: 10px;
  flex-shrink: 0;
  margin-right: 10px;
`;

interface TopicListProps {
  topics: TopicType[];
  setTopics: React.Dispatch<React.SetStateAction<TopicType[]>>;
  generatedTopics: GeneratedTopicType[];
  setGeneratedTopics: React.Dispatch<
    React.SetStateAction<GeneratedTopicType[]>
  >;
}

export default function TopicList({
  topics,
  setTopics,
  generatedTopics,
  setGeneratedTopics,
}: TopicListProps) {
  const theme = useContext(ThemeContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [loadings, setLoadings] = useState<Record<string, boolean>>({});

  // 주제 개수만큼 ref 생성
  const topicRefs = useMemo(
    () =>
      Array.from({ length: topics.length + generatedTopics.length }, () =>
        createRef<HTMLDivElement>()
      ),
    [topics.length + generatedTopics.length]
  );

  // 생성된 주제 개수만큼 loadings 크기 조절
  useEffect(() => {
    setLoadings((prev) => {
      const newLoadings: Record<string, boolean> = {};

      for (const topic of generatedTopics) {
        if (topic.name in prev) newLoadings[topic.name] = prev[topic.name];
        else newLoadings[topic.name] = false;
      }

      return newLoadings;
    });
  }, [generatedTopics.length]);

  // 주제 삭제 함수
  function handleRemoveTopic(topic: TopicType) {
    setTopics((prevTopics) => prevTopics.filter((t) => t.id !== topic.id));
  }

  // 생성된 주제를 생성하고 추가하는 함수
  async function handleAddGeneratedTopic(topic: GeneratedTopicType) {
    const topicToAdd: TopicType = {
      name: topic.name,
      id: topic.id ?? 0,
      usage: topic.usage ?? 0,
      trending: topic.trending,
    };

    // 주제가 등록되지 않았으면 생성
    if (!topic.registered) {
      setLoadings((prev) => ({ ...prev, [topic.name]: true }));

      const response = await API.topic.createTopic({ topic: topic.name });
      const { code, message, result } = response.data;

      if (code === "success" && result !== undefined)
        topicToAdd.id = result.topicId;
      else {
        setLoadings((prev) => ({ ...prev, [topic.name]: false }));
        return;
      }
    }

    // 생성된 주제 삭제
    setGeneratedTopics((prevTopics) =>
      prevTopics.filter((t) => t.name !== topic.name)
    );

    // 주제 추가
    setTopics((prevTopics) => [...prevTopics, topicToAdd]);
    setLoadings((prev) => ({ ...prev, [topic.name]: false }));
  }

  return (
    <Wrapper>
      <StyledButton
        backgroundColor={theme?.primary3}
        icon={<MdAdd size="20" color={theme?.bg1} />}
        iconPosition="left"
        onClick={() => setModalOpen(true)}
      >
        <Typography color={theme?.bg1} size="16px">
          직접 추가
        </Typography>
      </StyledButton>

      {/* 추가된 주제 */}
      {topics.map((topic, index) => (
        <Transition key={topic.id} timeout={500} nodeRef={topicRefs[index]}>
          {(state) => (
            <Topic
              ref={topicRefs[index]}
              topic={topic.name}
              onClick={() => handleRemoveTopic(topic)}
              transitionStatus={state}
              key={topic.id}
            />
          )}
        </Transition>
      ))}

      {/* 생성된 주제 */}
      {generatedTopics.map((topic, index) => (
        <Transition
          key={topic.id}
          timeout={500}
          nodeRef={topicRefs[topics.length + index]}
        >
          {(state) => (
            <GeneratedTopic
              ref={topicRefs[topics.length + index]}
              topic={topic.name}
              loading={loadings[topic.name]}
              onClick={() => handleAddGeneratedTopic(topic)}
              transitionStatus={state}
              key={topic.id}
            />
          )}
        </Transition>
      ))}

      <TopicModal
        addedTopics={topics}
        setAddedTopics={setTopics}
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
      />
    </Wrapper>
  );
}
