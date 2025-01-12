import { styled } from "styled-components";

import SearchResult from "./SearchResult";

import type { Topic } from "common";

const Wrapper = styled.div`
  display: flex;
  height: 250px;
  padding: 10px 0px;
  flex-direction: column;
  overflow-y: auto;
`;

interface SearchResultsProps {
  topics: Topic[];
  addedTopics: Topic[];
  setAddedTopics: React.Dispatch<React.SetStateAction<Topic[]>>;
}

export default function SearchResults({
  topics,
  addedTopics,
  setAddedTopics,
}: SearchResultsProps) {
  // 주제 추가 함수
  function handleAdd(newTopic: Topic) {
    setAddedTopics((prevTopics) => [
      { ...newTopic, enabled: true },
      ...prevTopics,
    ]);
  }

  // 주제 제거 함수
  function handleRemove(targetTopic: Topic) {
    setAddedTopics((prevTopics) =>
      prevTopics.filter((topic) => topic.id !== targetTopic.id)
    );
  }

  return (
    <Wrapper>
      {topics.map((topic) => (
        <SearchResult
          key={topic.id}
          topic={topic}
          added={addedTopics.some((addedTopic) => addedTopic.id === topic.id)}
          onAdd={handleAdd}
          onRemove={handleRemove}
        />
      ))}
    </Wrapper>
  );
}
