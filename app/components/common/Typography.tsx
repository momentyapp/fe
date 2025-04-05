import { styled } from "styled-components";
import { motion } from "motion/react";

import type { HexColor } from "common";

const Wrapper = styled.p`
  margin: 0;
  padding: 0;
  font-family: "Pretendard Variable", "Tossface";
  font-weight: 500;
  transition: font-size 0.2s ease-in-out;
`;

const MotionWrapper = motion.create(Wrapper);

interface TypographyProps extends React.ComponentProps<typeof MotionWrapper> {
  color?: HexColor;
}

export default function Typography({ children, ...props }: TypographyProps) {
  return (
    <MotionWrapper
      initial={false}
      {...props}
      animate={{ color: props.color ?? "#000000" }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </MotionWrapper>
  );
}
