import { styled } from "styled-components";

import My from "./My";
import Trending from "./Trending";
import Content from "./Content";
import Top from "./Top";
import Bottom from "./Bottom";

import type { Moment } from "common";

const Wrapper = styled.div<{ $highlight?: boolean }>`
  display: flex;
  width: 100%;
  padding: 20px 0px;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  border-radius: 15px;
  box-shadow: ${(props) =>
    props.$highlight ? `0px 0px 10px ${props.theme.primary3}` : "none"};
  background: ${(props) => props.theme.bg2};
  transition: box-shadow 0.2s;
`;

interface MomentProps {
  moment: Moment;
  my?: boolean;
  trending?: boolean;
  highlight?: boolean;
  onDetail: (moment: Moment) => void;
  onAddReaction: (emoji: string) => void;
  onRemoveReaction: () => void;
  onEmojiModalOpen: () => void;
}

export default function Moment({
  moment,
  my,
  trending,
  highlight = false,
  onDetail,
  onAddReaction,
  onRemoveReaction,
  onEmojiModalOpen,
}: MomentProps) {
  return (
    <Wrapper $highlight={highlight}>
      {my && <My />}
      {trending && <Trending />}

      <Top moment={moment} onDetail={() => onDetail(moment)} />
      <Content moment={moment} />
      <Bottom
        moment={moment}
        onAddReaction={onAddReaction}
        onRemoveReaction={onRemoveReaction}
        onEmojiModalOpen={onEmojiModalOpen}
      />
    </Wrapper>
  );
}
