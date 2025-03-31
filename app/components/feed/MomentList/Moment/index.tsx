import { memo, useEffect, useMemo, useRef } from "react";
import { styled } from "styled-components";
import { motion, useInView } from "motion/react";

import My from "./My";
import Trending from "./Trending";
import Content from "./Content";
import Top from "./Top";
import Bottom from "./Bottom";

import useSession from "~/contexts/useSession";

import type { Moment, Topic } from "common";

const Wrapper = styled.div`
  flex-shrink: 0;
  display: flex;
  width: 100%;
  padding: 20px 0px;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  background: ${(props) => props.theme.bg1};
  border-bottom: 1px solid ${(props) => props.theme.bg2};
`;

interface MomentProps {
  moment: Moment;
  trending?: boolean;
  highlight?: boolean;
  id?: string;
  onInfo: (moment: Moment) => void;
  onAddReaction: (momentId: number, emoji: string) => void;
  onRemoveReaction: (momentId: number) => void;
  onEmojiModalOpen: (moment: Moment) => void;
  onTopicClick?: (topic: Topic) => void;
  onInView?: (momentId: number) => void;
  onOutView?: (momentId: number) => void;
}

function Moment({
  moment,
  trending,
  id,
  onInfo,
  onAddReaction,
  onRemoveReaction,
  onEmojiModalOpen,
  onTopicClick,
  onInView,
  onOutView,
}: MomentProps) {
  const ref = useRef<HTMLDivElement>(null);

  const session = useSession();
  const isInView = useInView(ref);

  const my = useMemo(
    () =>
      moment.author !== undefined &&
      session.user !== null &&
      moment.author?.id === session.user?.id,
    [moment, session]
  );

  useEffect(() => {
    if (isInView) onInView?.(moment.id);
    else onOutView?.(moment.id);
  }, [isInView]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Wrapper ref={ref} id={id}>
        {my && <My />}
        {trending && <Trending />}

        <Top moment={moment} onDetail={() => onInfo(moment)} />
        <Content moment={moment} onTopicClick={onTopicClick} />
        <Bottom
          moment={moment}
          onAddReaction={(emoji) => onAddReaction(moment.id, emoji)}
          onRemoveReaction={() => onRemoveReaction(moment.id)}
          onEmojiModalOpen={() => onEmojiModalOpen(moment)}
        />
      </Wrapper>
    </motion.div>
  );
}

export default memo(Moment);
