import { useTheme } from "styled-components";
import { motion } from "motion/react";

import * as S from "./EmojiContainer.style";

const emojis = [..."😀😂😅😋😎😍🤔🙄😣😥😮😯😪🥱😱🥵😡🤮💀💩💪👍👎❤💔"];

interface EmojiContainerProps {
  onSelect: (emoji: string) => void;
  myEmoji?: string;
}

export default function EmojiContainer({
  onSelect,
  myEmoji,
}: EmojiContainerProps) {
  const theme = useTheme();

  return (
    <S.Wrapper>
      {emojis.map((emoji, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.3,
            delay: ((index % 5) + Math.floor(index / 5)) * 0.03,
          }}
        >
          <S.EmojiButton
            onClick={() => onSelect(emoji)}
            backgroundColor={myEmoji === emoji ? theme.primary5 : theme.bg2}
          >
            <S.EmojiText>{emoji}</S.EmojiText>
          </S.EmojiButton>
        </motion.div>
      ))}
    </S.Wrapper>
  );
}
