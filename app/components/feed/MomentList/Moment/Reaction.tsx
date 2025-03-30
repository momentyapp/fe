import { createRef, useContext, useEffect, useState } from "react";
import { styled, ThemeContext } from "styled-components";
import { motion } from "motion/react";

import Emoji from "~/components/common/Emoji";
import Pressable from "~/components/common/Pressable";
import Typography from "~/components/common/Typography";

const Wrapper = styled.div`
  overflow: hidden;
  padding: 0;
  flex-shrink: 0;
`;

const EmojiButton = styled(Pressable)<{ $isMy?: boolean }>`
  display: flex;
  padding: 7px 12px;
  justify-content: center;
  align-items: center;
  gap: 5px;
  box-shadow: 0 0 0 ${(props) => (props.$isMy ? "1px" : "0px")}
    ${(props) => props.theme?.primary4} inset;
  border-radius: 10px;
`;

interface ReactionProps {
  emoji: string;
  count: number;
  myEmoji: boolean;
  onClick?: () => void;
  ref?: React.Ref<HTMLDivElement>;
}

export default function Reaction({
  emoji,
  count,
  myEmoji,
  onClick,
  ref,
}: ReactionProps) {
  const theme = useContext(ThemeContext);

  return (
    <motion.div
      ref={ref}
      initial={{ width: 0, marginRight: 0 }}
      animate={{ width: "auto", marginRight: "10px" }}
      exit={{ width: 0, marginRight: 0 }}
      transition={{
        type: "spring",
        duration: 0.7,
      }}
      style={{
        borderRadius: "10px",
        display: "flex",
        justifyContent: "flex-start",
        flexShrink: 0,
      }}
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
      >
        <EmojiButton
          $isMy={myEmoji}
          backgroundColor={myEmoji ? theme?.primary5 : theme?.bg2}
          onClick={onClick}
        >
          <Emoji size="16px">{emoji}</Emoji>
          <Typography
            color={myEmoji ? theme?.primary1 : theme?.grey1}
            size="16px"
          >
            {count.toLocaleString()}
          </Typography>
        </EmojiButton>
      </motion.div>
    </motion.div>
  );
}
