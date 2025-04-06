import { useEffect, useMemo, useRef } from "react";
import { motion, useInView } from "motion/react";

import My from "./My";
import Trending from "./Trending";
import Content from "./Content";
import Top from "./Top";
import Bottom from "./Bottom";

import useSession from "~/contexts/useSession";

import * as S from "./index.style";

import type { Moment, Topic } from "common";

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

export default function Moment({
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      layout={isInView}
    >
      <S.Wrapper ref={ref} id={id}>
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
      </S.Wrapper>
    </motion.div>
  );
}
