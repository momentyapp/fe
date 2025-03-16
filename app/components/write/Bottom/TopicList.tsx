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

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 3px 10px;
  width: 100%;
  overflow-x: auto;
  box-sizing: border-box;
`;

const InsideTopicList = styled(TransitionGroup)`
  display: flex;
  flex-direction: row;
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

  // 주제가 생성되면 loadings 갱신
  useEffect(() => {
    setLoadings((prevLoadings) => {
      const newLoadings = { ...prevLoadings };

      for (const topic of generatedTopics) {
        if (topic.known) continue;
        if (topic.name in prevLoadings) continue;
        newLoadings[topic.name] = false;
      }

      return newLoadings;
    });
  }, [generatedTopics]);

  // 주제 삭제 함수
  function handleRemoveTopic(topic: TopicType) {
    setTopics((prevTopics) => prevTopics.filter((t) => t.id !== topic.id));
  }

  // 생성된 주제를 추가하는 함수
  async function handleAddGeneratedTopic(topic: GeneratedTopicType) {
    let topicToAdd: TopicType;

    // 알려진 주제인 경우
    if (topic.known) {
      topicToAdd = {
        name: topic.name,
        id: topic.id ?? 0,
        usage: topic.usage ?? 0,
        trending: topic.trending,
      };
    }
    // 알려지지 않은 주제인 경우
    else {
      // 주제 추가 API 호출
      setLoadings((prevLoadings) => ({
        ...prevLoadings,
        [topic.name]: true,
      }));

      const response = await API.topic.createTopic({ topic: topic.name });

      setLoadings((prevLoadings) => {
        const newLoadings = { ...prevLoadings };
        delete newLoadings[topic.name];
        return newLoadings;
      });
      const { code, message, result } = response.data;

      // 주제 추가 실패
      if (code !== "success" || result === undefined) return;

      topicToAdd = {
        name: topic.name,
        id: result.topicId,
        usage: 0,
        trending: false,
      };
    }

    // 생성된 주제 삭제
    setGeneratedTopics((prevTopics) =>
      prevTopics.filter((t) => t.name !== topic.name)
    );

    // 주제 추가
    setTopics((prevTopics) => [...prevTopics, topicToAdd]);
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
      <InsideTopicList>
        {/* 추가된 주제 */}
        {topics.map((topic, index) => (
          <Transition key={topic.id} timeout={500} nodeRef={topicRefs[index]}>
            {(state) => (
              <Topic
                ref={topicRefs[index]}
                topic={topic.name}
                onClick={() => handleRemoveTopic(topic)}
                transitionStatus={state}
              />
            )}
          </Transition>
        ))}

        {/* 생성된 주제 */}
        {generatedTopics.map((topic, index) => (
          <Transition
            key={topic.name}
            timeout={500}
            nodeRef={topicRefs[topics.length + index]}
          >
            {(state) => (
              <GeneratedTopic
                ref={topicRefs[topics.length + index]}
                topic={topic.name}
                onClick={() => handleAddGeneratedTopic(topic)}
                transitionStatus={state}
                loading={loadings[topic.name] ?? false}
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
      </InsideTopicList>
    </Wrapper>
  );
}
