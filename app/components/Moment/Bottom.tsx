import { useContext, useState } from "react";
import { styled, ThemeContext } from "styled-components";

import { MdAddReaction } from "react-icons/md";

import Typography from "~/components/Typography";
import Pressable from "~/components/Pressable";
import Emoji from "~/components/Emoji";
import EmojiPickerModal from "~/components/EmojiPickerModal";

import type { Moment } from "common";
import Slide from "../Slide";

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

const Reaction = styled(Pressable)<{ $myEmoji?: boolean }>`
  display: flex;
  height: 38px;
  padding: 0px 10px;
  justify-content: center;
  align-items: center;
  gap: 5px;
  border: ${(props) => (props.$myEmoji ? "2px" : "0px")} solid
    ${(props) => props.theme?.grey3};
  border-radius: 10px;
`;

interface BottomProps {
  moment: Moment;
  onAddReaction?: (emoji: string) => void;
  onRemoveReaction?: () => void;
}

export default function Bottom({
  moment,
  onAddReaction,
  onRemoveReaction,
}: BottomProps) {
  const theme = useContext(ThemeContext);

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  function handleReactionClick(emoji: string) {
    if (moment.myEmoji === emoji) onRemoveReaction?.();
    else onAddReaction?.(emoji);
  }

  function handleShowEmojiPicker() {
    setShowEmojiPicker(true);
  }

  return (
    <>
      <Wrapper>
        <ReactionContainer>
          <Reaction
            backgroundColor={theme?.bg1}
            onClick={handleShowEmojiPicker}
          >
            <MdAddReaction size="20px" color={theme?.grey1} />
          </Reaction>

          {Object.keys(moment.reactions).map((emoji, index) => (
            <Slide
              visible
              key={emoji}
              delay={index * 50}
              initinalTransition={false}
              direction="right"
              distance="5px"
            >
              <Reaction
                key={emoji}
                backgroundColor={
                  moment.myEmoji === emoji ? theme?.primary5 : theme?.bg1
                }
                onClick={() => handleReactionClick(emoji)}
              >
                <Emoji size="18px">{emoji}</Emoji>
                <Typography
                  color={
                    moment.myEmoji === emoji ? theme?.primary1 : theme?.grey1
                  }
                  size="16px"
                >
                  {moment.reactions[emoji].toLocaleString()}
                </Typography>
              </Reaction>
            </Slide>
          ))}
        </ReactionContainer>
      </Wrapper>

      {/* 이모지 피커 */}
      <EmojiPickerModal
        isOpen={showEmojiPicker}
        onRequestClose={() => setShowEmojiPicker(false)}
        myEmoji={moment.myEmoji}
        onSelect={handleReactionClick}
      />
    </>
  );
}
