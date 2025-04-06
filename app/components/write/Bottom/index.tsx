import TopicContainer from "./TopicContainer";
import Island from "./Island";

import * as S from "./index.style";

import type { MomentConfig, Topic, GeneratedTopic } from "common";

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
    <S.Wrapper>
      <TopicContainer
        topics={topics}
        setTopics={setTopics}
        generatedTopics={generatedTopics}
        setGeneratedTopics={setGeneratedTopics}
      />
      <Island config={config} setConfig={setConfig} onPost={onPost} />
    </S.Wrapper>
  );
}
