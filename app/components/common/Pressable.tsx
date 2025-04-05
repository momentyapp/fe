import { motion } from "motion/react";
import { styled } from "styled-components";

import useColorFeedback from "~/hooks/useColorFeedback";

import type { HexColor } from "common";

const Wrapper = styled.button`
  border: none;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
`;

const MotionWrapper = motion.create(Wrapper);

export interface PressableProps
  extends React.ComponentProps<typeof MotionWrapper> {
  backgroundColor?: HexColor;
}

export default function Pressable({
  children,
  backgroundColor = "#00000000",
  ...props
}: PressableProps) {
  const { tapColor, focusColor } = useColorFeedback(backgroundColor);

  return (
    <MotionWrapper
      initial={false}
      {...props}
      animate={{ backgroundColor: backgroundColor ?? "#00000000" }}
      whileTap={{ scale: 0.95, backgroundColor: tapColor ?? "#00000028" }}
      whileHover={{ scale: 1.05, backgroundColor: focusColor ?? "#00000014" }}
      whileFocus={{ scale: 1.05, backgroundColor: focusColor ?? "#00000014" }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </MotionWrapper>
  );
}
