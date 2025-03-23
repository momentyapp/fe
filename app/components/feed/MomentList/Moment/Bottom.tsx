import { useContext, useState } from "react";
import { styled, ThemeContext } from "styled-components";

import { MdAddReaction } from "react-icons/md";

import Typography from "~/components/common/Typography";
import Pressable from "~/components/common/Pressable";
import Emoji from "~/components/common/Emoji";

import type { Moment } from "common";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  width: 100%;
  overflow-x: auto;
`;

const ReactionContainer = styled.div`
  display: flex;
  padding: 0px 20px;
  gap: 10px;
`;

const AddReaction = styled(Pressable)<{ $myEmoji?: boolean }>`
  display: flex;
  padding: 7px 12px;
  justify-content: center;
  align-items: center;
  gap: 5px;
  border: ${(props) => (props.$myEmoji ? "1px" : "0px")} solid
    ${(props) => props.theme?.primary4};
  border-radius: 10px;
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

  return (
    <>
      <Wrapper ref={ref}>
        <ReactionContainer>
          <AddReaction backgroundColor={theme?.bg1} onClick={onEmojiModalOpen}>
            <MdAddReaction size="20px" color={theme?.grey1} />
          </AddReaction>

          {Object.keys(moment.reactions).map((emoji) => (
            <AddReaction
              $myEmoji={moment.myEmoji === emoji}
              key={emoji}
              backgroundColor={
                moment.myEmoji === emoji ? theme?.primary5 : theme?.bg2
              }
              onClick={() => handleReactionClick(emoji)}
            >
              <Emoji size="16px">{emoji}</Emoji>
              <Typography
                color={
                  moment.myEmoji === emoji ? theme?.primary1 : theme?.grey1
                }
                size="16px"
              >
                {moment.reactions[emoji].toLocaleString()}
              </Typography>
            </AddReaction>
          ))}
        </ReactionContainer>
      </Wrapper>
    </>
  );
}
