import { useTheme } from "styled-components";

import CircularProgress from "~/components/common/CircularProgress";

import Topic from "./Topic";
import New from "./New";

import * as S from "./TopicContainer.style";

import type { Topic as TopicType } from "common";

interface TopicContainerProps {
  topics: TopicType[];
  addedTopics: TopicType[];
  setAddedTopics: React.Dispatch<React.SetStateAction<TopicType[]>>;
  searchValue: string;
  isLoading?: boolean;
  onCreate: (topic: string, topicId: number) => void;
}

export default function TopicContainer({
  topics,
  addedTopics,
  setAddedTopics,
  searchValue,
  isLoading = false,
  onCreate,
}: TopicContainerProps) {
  const theme = useTheme();

  // 주제 추가 함수
  function handleAdd(newTopic: TopicType) {
    setAddedTopics((prevTopics) => [
      { ...newTopic, enabled: true },
      ...prevTopics,
    ]);
  }

  // 주제 제거 함수
  function handleRemove(targetTopic: TopicType) {
    setAddedTopics((prevTopics) =>
      prevTopics.filter((topic) => topic.id !== targetTopic.id)
    );
  }

  return (
    <S.Wrapper>
      {!isLoading &&
        searchValue !== "" &&
        topics.every(
          (topic) => topic.name.toLowerCase() !== searchValue.toLowerCase()
        ) && <New topic={searchValue} onCreate={onCreate} />}

      {isLoading ? (
        <S.ProgressWrapper>
          <CircularProgress color={theme.grey1} size={30} />
        </S.ProgressWrapper>
      ) : (
        topics.map((topic) => (
          <Topic
            key={topic.id}
            topic={topic}
            added={addedTopics.some((addedTopic) => addedTopic.id === topic.id)}
            onAdd={handleAdd}
            onRemove={handleRemove}
          />
        ))
      )}
    </S.Wrapper>
  );
}
