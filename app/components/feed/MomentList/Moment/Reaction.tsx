import { createRef, useContext, useEffect, useState } from "react";
import { styled, ThemeContext } from "styled-components";

import Emoji from "~/components/common/Emoji";
import Pressable from "~/components/common/Pressable";
import Typography from "~/components/common/Typography";

import type { TransitionStatus } from "react-transition-group";

const Wrapper = styled.div<{
  $in: boolean;
  $width: number;
}>`
  margin-right: ${(props) => (props.$in ? 10 : 0)}px;
  width: ${(props) => (props.$in ? props.$width + 24 : 0)}px;
  opacity: ${(props) => (props.$in ? 1 : 0)};
  transition: margin-right 0.5s cubic-bezier(0.17, 0.84, 0.44, 1),
    width 0.5s cubic-bezier(0.17, 0.84, 0.44, 1),
    opacity 0.5s cubic-bezier(0.17, 0.84, 0.44, 1);
  overflow: hidden;
  padding: 0;
  flex-shrink: 0;
`;

const StyledPressable = styled(Pressable)<{ $myEmoji?: boolean }>`
  display: flex;
  padding: 7px 12px;
  justify-content: center;
  align-items: center;
  gap: 5px;
  box-shadow: 0 0 0 ${(props) => (props.$myEmoji ? "1px" : "0px")}
    ${(props) => props.theme?.primary4} inset;
  border-radius: 10px;
`;

interface ReactionProps {
  emoji: string;
  count: number;
  myEmoji: boolean;
  onClick?: () => void;
  transitionStatus?: TransitionStatus;
  ref?: React.Ref<HTMLDivElement>;
}

export default function Reaction({
  emoji,
  count,
  myEmoji,
  onClick,
  ref,
  transitionStatus = "entered",
}: ReactionProps) {
  const theme = useContext(ThemeContext);
  const contentRef = createRef<HTMLButtonElement>();
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (contentRef.current === null) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setWidth(entry.contentRect.width);
      }
    });
    observer.observe(contentRef.current);
    return () => observer.disconnect();
  }, [contentRef]);

  return (
    <Wrapper
      ref={ref}
      $in={
        width > 0 &&
        (transitionStatus === "entered" || transitionStatus === "entering")
      }
      $width={width}
    >
      <StyledPressable
        $myEmoji={myEmoji}
        backgroundColor={myEmoji ? theme?.primary5 : theme?.bg2}
        onClick={onClick}
        ref={contentRef}
      >
        <Emoji size="16px">{emoji}</Emoji>
        <Typography
          color={myEmoji ? theme?.primary1 : theme?.grey1}
          size="16px"
        >
          {count.toLocaleString()}
        </Typography>
      </StyledPressable>
    </Wrapper>
  );
}
