import { styled } from "styled-components";

import Content from "./Content";
import Top from "./Top";
import Bottom from "./Bottom";

import type { Moment } from "common";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 20px 0px;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  border-radius: 15px;
  background: ${(props) => props.theme.bg2};
`;

interface MomentProps {
  moment: Moment;
  trending?: boolean;
  onAddReaction?: (emoji: string) => void;
  onRemoveReaction?: () => void;
}

export default function Moment({
  moment,
  trending,
  onAddReaction,
  onRemoveReaction,
}: MomentProps) {
  return (
    <Wrapper>
      <Top moment={moment} />
      <Content moment={moment} />
      <Bottom
        moment={moment}
        onAddReaction={onAddReaction}
        onRemoveReaction={onRemoveReaction}
      />
    </Wrapper>
  );
}
