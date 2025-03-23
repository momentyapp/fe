import { styled } from "styled-components";

import My from "./My";
import Trending from "./Trending";
import Content from "./Content";
import Top from "./Top";
import Bottom from "./Bottom";

import type { Moment } from "common";

const Wrapper = styled.div<{
  $highlight?: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  transition: margin-bottom 0.5s cubic-bezier(0.17, 0.84, 0.44, 1),
    height 0.5s cubic-bezier(0.17, 0.84, 0.44, 1),
    opacity 0.5s cubic-bezier(0.17, 0.84, 0.44, 1), box-shadow 0.2s;
  overflow: hidden;
  box-shadow: ${(props) =>
    props.$highlight ? `0px 0px 10px ${props.theme.primary3}` : "none"};
  border-bottom: 1px solid ${(props) => props.theme.bg2};
`;

const MomentContent = styled.div`
  flex-shrink: 0;
  display: flex;
  width: 100%;
  padding: 20px 0px;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  background: ${(props) => props.theme.bg1};
`;

interface MomentProps {
  moment: Moment;
  my?: boolean;
  trending?: boolean;
  highlight?: boolean;
  ref?: React.Ref<HTMLDivElement>;
  id?: string;
  onInfo: (moment: Moment) => void;
  onAddReaction: (emoji: string) => void;
  onRemoveReaction: () => void;
  onEmojiModalOpen: () => void;
  onVisible?: () => void;
  onInvisible?: () => void;
}

export default function Moment({
  moment,
  my,
  trending,
  highlight = false,
  ref,
  id,
  onInfo,
  onAddReaction,
  onRemoveReaction,
  onEmojiModalOpen,
}: MomentProps) {
  return (
    <Wrapper $highlight={highlight}>
      <MomentContent ref={ref} id={id}>
        {my && <My />}
        {trending && <Trending />}

        <Top moment={moment} onDetail={() => onInfo(moment)} />
        <Content moment={moment} />
        <Bottom
          moment={moment}
          onAddReaction={onAddReaction}
          onRemoveReaction={onRemoveReaction}
          onEmojiModalOpen={onEmojiModalOpen}
        />
      </MomentContent>
    </Wrapper>
  );
}
