import { styled } from "styled-components";

import TopicList from "./TopicList";
import Island from "./Island";

import type { MomentConfig, Topic, GeneratedTopic } from "common";

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

interface BottomProps {
  topics: Topic[];
  setTopics: React.Dispatch<React.SetStateAction<Topic[]>>;
  generatedTopics: GeneratedTopic[];
  setGeneratedTopics: React.Dispatch<React.SetStateAction<GeneratedTopic[]>>;
  config: MomentConfig;
  setConfig: React.Dispatch<React.SetStateAction<MomentConfig>>;
  onPost: () => void;
}

export default function Bottom({
  topics,
  setTopics,
  generatedTopics,
  setGeneratedTopics,
  config,
  setConfig,
  onPost,
}: BottomProps) {
  return (
    <Wrapper>
      <TopicList
        topics={topics}
        setTopics={setTopics}
        generatedTopics={generatedTopics}
        setGeneratedTopics={setGeneratedTopics}
      />
      <Island config={config} setConfig={setConfig} onPost={onPost} />
    </Wrapper>
  );
}
