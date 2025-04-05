import { motion } from "motion/react";
import { useMemo } from "react";
import { styled } from "styled-components";

import getFocusColor from "~/utils/getFocusColor";
import getTapColor from "~/utils/getTapColor";

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
  backgroundColor,
  ...props
}: PressableProps) {
  const { cleanHex, opacity } = useMemo(() => {
    if (backgroundColor !== undefined) {
      if (backgroundColor.length === 9) {
        const cleanHex = backgroundColor.slice(0, 7);
        const opacity = backgroundColor.slice(7, 9);
        return { cleanHex, opacity };
      }

      if (backgroundColor.length === 7) {
        return { cleanHex: backgroundColor, opacity: null };
      }
    }
    return { cleanHex: null, opacity: null };
  }, [backgroundColor]);

  const { tapColor, focusColor } = useMemo(
    () => ({
      tapColor: cleanHex
        ? `${getTapColor(cleanHex)}${opacity ? opacity : ""}`
        : null,
      focusColor: cleanHex
        ? `${getFocusColor(cleanHex)}${opacity ? opacity : ""}`
        : null,
    }),
    [cleanHex, opacity]
  );

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
