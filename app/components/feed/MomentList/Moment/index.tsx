import { memo, useMemo } from "react";
import { styled } from "styled-components";

import My from "./My";
import Trending from "./Trending";
import Content from "./Content";
import Top from "./Top";
import Bottom from "./Bottom";

import type { Moment } from "common";
import useSession from "~/contexts/useSession";

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
  trending?: boolean;
  highlight?: boolean;
  ref?: React.Ref<HTMLDivElement>;
  id?: string;
  onInfo: (moment: Moment) => void;
  onAddReaction: (momentId: number, emoji: string) => void;
  onRemoveReaction: (momentId: number) => void;
  onEmojiModalOpen: (moment: Moment) => void;
}

function Moment({
  moment,
  trending,
  highlight = false,
  ref,
  id,
  onInfo,
  onAddReaction,
  onRemoveReaction,
  onEmojiModalOpen,
}: MomentProps) {
  const session = useSession();

  const my = useMemo(
    () =>
      moment.author !== undefined &&
      session.user !== null &&
      moment.author?.id === session.user?.id,
    [moment, session]
  );

  return (
    <Wrapper $highlight={highlight}>
      <MomentContent ref={ref} id={id}>
        {my && <My />}
        {trending && <Trending />}

        <Top moment={moment} onDetail={() => onInfo(moment)} />
        <Content moment={moment} />
        <Bottom
          moment={moment}
          onAddReaction={(emoji) => onAddReaction(moment.id, emoji)}
          onRemoveReaction={() => onRemoveReaction(moment.id)}
          onEmojiModalOpen={() => onEmojiModalOpen(moment)}
        />
      </MomentContent>
    </Wrapper>
  );
}

export default memo(Moment);
