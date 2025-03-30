import React, { useContext, useEffect, useState } from "react";
import { styled, ThemeContext } from "styled-components";
import { AnimatePresence } from "motion/react";
import { MdAddReaction } from "react-icons/md";

import Pressable from "~/components/common/Pressable";

import Reaction from "./Reaction";

import type { Moment } from "common";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  overflow-x: auto;
  padding: 5px 15px;
  box-sizing: border-box;
`;

const AddReaction = styled(Pressable)<{ $myEmoji?: boolean }>`
  display: flex;
  padding: 7px 12px;
  justify-content: center;
  align-items: center;
  gap: 5px;
  box-shadow: 0 0 0 ${(props) => (props.$myEmoji ? "1px" : "0px")}
    ${(props) => props.theme?.primary4} inset;
  border-radius: 10px;
  margin-right: 15px;
`;

interface BottomProps {
  moment: Moment;
  onAddReaction: (emoji: string) => void;
  onRemoveReaction: () => void;
  onEmojiModalOpen: () => void;
  ref?: React.Ref<HTMLDivElement>;
}

export default function Bottom({
  moment,
  onAddReaction,
  onRemoveReaction,
  onEmojiModalOpen,
  ref,
}: BottomProps) {
  const theme = useContext(ThemeContext);

  function handleReactionClick(emoji: string) {
    if (moment.myEmoji === emoji) onRemoveReaction();
    else onAddReaction(emoji);
  }

  const [initialized, setInitialized] = useState(false);
  useEffect(() => setInitialized(true), []);

  return (
    <Wrapper ref={ref}>
      <AddReaction backgroundColor={theme?.bg1} onClick={onEmojiModalOpen}>
        <MdAddReaction size="20px" color={theme?.grey1} />
      </AddReaction>

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
    </Wrapper>
  );
}
