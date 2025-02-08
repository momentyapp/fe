import { styled } from "styled-components";

import SearchResult from "./SearchResult";

import type { Topic } from "common";
import New from "./New";

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
  searchValue: string;
  onCreate: (topic: string, topicId: number) => void;
}

export default function SearchResults({
  topics,
  addedTopics,
  setAddedTopics,
  searchValue,
  onCreate,
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
      {searchValue !== "" &&
        topics.every(
          (topic) => topic.name.toLowerCase() !== searchValue.toLowerCase()
        ) && <New topic={searchValue} onCreate={onCreate} />}

      {topics.map((topic, index) => (
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
