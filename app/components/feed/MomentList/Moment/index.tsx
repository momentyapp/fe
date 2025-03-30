import { memo, useMemo } from "react";
import { styled } from "styled-components";
import { motion } from "motion/react";

import My from "./My";
import Trending from "./Trending";
import Content from "./Content";
import Top from "./Top";
import Bottom from "./Bottom";

import type { Moment } from "common";
import useSession from "~/contexts/useSession";

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Wrapper ref={ref} id={id}>
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
      </Wrapper>
    </motion.div>
  );
}

export default memo(Moment);
