import { useTheme } from "styled-components";
import { motion } from "motion/react";

import * as S from "./Reaction.style";

interface ReactionProps {
  emoji: string;
  count: number;
  myEmoji: boolean;
  onClick?: () => void;
}

export default function Reaction({
  emoji,
  count,
  myEmoji,
  onClick,
}: ReactionProps) {
  const theme = useTheme();

  return (
    <S.MotionWrapper
      initial={{ width: 0, marginRight: 0 }}
      animate={{ width: "auto", marginRight: "10px" }}
      exit={{ width: 0, marginRight: 0 }}
      transition={{
        type: "spring",
        duration: 0.7,
      }}
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
      >
        <S.EmojiButton
          backgroundColor={myEmoji ? theme.primary5 : theme.bg2}
          onClick={onClick}
          $isMy={myEmoji}
        >
          <S.EmojiText>{emoji}</S.EmojiText>
          <S.EmojiCount color={myEmoji ? theme.primary1 : theme.grey1}>
            {count.toLocaleString()}
          </S.EmojiCount>
        </S.EmojiButton>
      </motion.div>
    </S.MotionWrapper>
  );
}
