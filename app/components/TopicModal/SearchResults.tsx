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
}

export default function SearchResults({ topics }: SearchResultsProps) {
  return (
    <Wrapper>
      {topics.map((topic) => (
        <SearchResult key={topic.id} topic={topic} />
      ))}
    </Wrapper>
  );
}
