import { useEffect, useState } from "react";
import { useTheme } from "styled-components";
import { AnimatePresence } from "motion/react";
import { MdAddReaction } from "react-icons/md";

import Reaction from "./Reaction";

import * as S from "./Bottom.style";

import type { Moment } from "common";

interface BottomProps {
  moment: Moment;
  onAddReaction: (emoji: string) => void;
  onRemoveReaction: () => void;
  onEmojiModalOpen: () => void;
}

export default function Bottom({
  moment,
  onAddReaction,
  onRemoveReaction,
  onEmojiModalOpen,
}: BottomProps) {
  const theme = useTheme();

  function handleReactionClick(emoji: string) {
    if (moment.myEmoji === emoji) onRemoveReaction();
    else onAddReaction(emoji);
  }

  const [initialized, setInitialized] = useState(false);
  useEffect(() => setInitialized(true), []);

  return (
    <S.Wrapper>
      <S.AddReaction backgroundColor={theme.bg1} onClick={onEmojiModalOpen}>
        <MdAddReaction size="20px" color={theme.grey1} />
      </S.AddReaction>

      <AnimatePresence initial={initialized}>
        {Object.keys(moment.reactions).map((emoji) => (
          <Reaction
            emoji={emoji}
            count={moment.reactions[emoji]}
            myEmoji={moment.myEmoji === emoji}
            key={emoji}
            onClick={() => handleReactionClick(emoji)}
          />
        ))}
      </AnimatePresence>
    </S.Wrapper>
  );
}
