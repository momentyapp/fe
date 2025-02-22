import { useContext } from "react";
import { styled, ThemeContext } from "styled-components";

import CircularProgress from "~/components/common/CircularProgress";

import SearchResult from "./SearchResult";
import New from "./New";

import type { Topic } from "common";

const Wrapper = styled.div`
  display: flex;
  height: 250px;
  padding: 10px 0px;
  flex-direction: column;
  overflow-y: auto;
`;

const FullWidth = styled.div`
  width: 100%;
  padding: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface SearchResultsProps {
  topics: Topic[];
  addedTopics: Topic[];
  setAddedTopics: React.Dispatch<React.SetStateAction<Topic[]>>;
  searchValue: string;
  loading?: boolean;
  onCreate: (topic: string, topicId: number) => void;
}

export default function SearchResults({
  topics,
  addedTopics,
  setAddedTopics,
  searchValue,
  loading = false,
  onCreate,
}: SearchResultsProps) {
  const theme = useContext(ThemeContext);

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
      {!loading &&
        searchValue !== "" &&
        topics.every(
          (topic) => topic.name.toLowerCase() !== searchValue.toLowerCase()
        ) && <New topic={searchValue} onCreate={onCreate} />}

      {loading ? (
        <FullWidth>
          <CircularProgress color={theme?.grey1} size={30} />
        </FullWidth>
      ) : (
        topics.map((topic, index) => (
          <SearchResult
            key={topic.id}
            topic={topic}
            added={addedTopics.some((addedTopic) => addedTopic.id === topic.id)}
            onAdd={handleAdd}
            onRemove={handleRemove}
          />
        ))
      )}
    </Wrapper>
  );
}
