import { styled } from "styled-components";

import Topics from "./Topics";
import Config from "./Config";

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
  config: MomentConfig;
  setConfig: React.Dispatch<React.SetStateAction<MomentConfig>>;
  onPost: () => void;
}

export default function WriteFloatingBar({
  topics,
  setTopics,
  config,
  setConfig,
  onPost,
}: WriteFloatingBarProps) {
  return (
    <Wrapper>
      <Topics topics={topics} setTopics={setTopics} />
      <Config config={config} setConfig={setConfig} onPost={onPost} />
    </Wrapper>
  );
}
