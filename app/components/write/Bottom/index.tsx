import { styled } from "styled-components";

import TopicList from "./TopicList";
import Island from "./Island";

import type { MomentConfig, Topic } from "common";

const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding-top: 40px;
  background: ${(props) => `linear-gradient(
    0deg,
    ${props.theme.bg1} 0%,
    ${props.theme.bg1} 90%,
    transparent 100%
  )`};
`;

interface WriteFloatingBarProps {
  topics: Topic[];
  setTopics: React.Dispatch<React.SetStateAction<Topic[]>>;
  generatedKnownTopics: Topic[];
  setGeneratedKnownTopics: React.Dispatch<React.SetStateAction<Topic[]>>;
  generatedUnknownTopics: string[];
  setGeneratedUnknownTopics: React.Dispatch<React.SetStateAction<string[]>>;
  config: MomentConfig;
  setConfig: React.Dispatch<React.SetStateAction<MomentConfig>>;
  onPost: () => void;
}

export default function WriteFloatingBar({
  topics,
  setTopics,
  generatedKnownTopics,
  setGeneratedKnownTopics,
  generatedUnknownTopics,
  setGeneratedUnknownTopics,
  config,
  setConfig,
  onPost,
}: WriteFloatingBarProps) {
  return (
    <Wrapper>
      <TopicList
        topics={topics}
        setTopics={setTopics}
        generatedKnownTopics={generatedKnownTopics}
        setGeneratedKnownTopics={setGeneratedKnownTopics}
        generatedUnknownTopics={generatedUnknownTopics}
        setGeneratedUnknownTopics={setGeneratedUnknownTopics}
      />
      <Island config={config} setConfig={setConfig} onPost={onPost} />
    </Wrapper>
  );
}
