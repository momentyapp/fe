import { motion } from "motion/react";
import { styled } from "styled-components";
import Emoji from "~/components/common/Emoji";

import Pressable from "~/components/common/Pressable";
import Typography from "~/components/common/Typography";

const Wrapper = styled.div`
  border-radius: 10px;
  display: flex;
  justify-content: flex-start;
  flex-shrink: 0;
`;
export const MotionWrapper = motion.create(Wrapper);

export const EmojiButton = styled(Pressable)<{ $isMy?: boolean }>`
  display: flex;
  padding: 7px 12px;
  justify-content: center;
  align-items: center;
  gap: 5px;
  box-shadow: 0 0 0 ${(props) => (props.$isMy ? "1px" : "0px")}
    ${(props) => props.theme.primary4} inset;
  border-radius: 10px;
  transition: box-shadow 0.2s;
`;

export const EmojiText = styled(Emoji)`
  font-size: 16px;
`;

export const EmojiCount = styled(Typography)`
  font-size: 16px;
`;
