import { createRef, useContext, useEffect, useState, type Ref } from "react";
import { styled, ThemeContext } from "styled-components";

import Pressable, { type PressableProps } from "~/components/common/Pressable";
import Typography from "~/components/common/Typography";

import type { TransitionStatus } from "react-transition-group";

const StyledPressable = styled(Pressable)<{
  $in: boolean;
  $width: number;
}>`
  display: flex;
  height: 36px;
  justify-content: center;
  padding: 0;
  align-items: center;
  border-radius: 10px;
  margin-right: ${(props) => (props.$in ? 10 : 0)}px;
  width: ${(props) => (props.$in ? props.$width + 30 : 0)}px;
  opacity: ${(props) => (props.$in ? 1 : 0)};
  transition: margin-right 0.5s cubic-bezier(0.17, 0.84, 0.44, 1),
    width 0.5s cubic-bezier(0.17, 0.84, 0.44, 1),
    opacity 0.5s cubic-bezier(0.17, 0.84, 0.44, 1), background 0.2s, filter 0.2s,
    transform 0.1s ease-in-out;
  overflow: hidden;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  flex-shrink: 0;
`;

const StyledTypography = styled(Typography)`
  transition: color 0.2s;
`;

interface TopicToggleProps extends PressableProps {
  topic: string;
  enabled?: boolean;
  transitionStatus?: TransitionStatus;
  ref: Ref<HTMLButtonElement>;
}

export default function TopicToggle({
  topic,
  enabled = false,
  ref,
  transitionStatus = "entered",
  ...props
}: TopicToggleProps) {
  const theme = useContext(ThemeContext);
  const [width, setWidth] = useState(0);
  const contentRef = createRef<HTMLDivElement>();

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
    <StyledPressable
      backgroundColor={enabled ? theme?.primary3 : theme?.bg2}
      ref={ref}
      $in={
        width > 0 &&
        (transitionStatus === "entered" || transitionStatus === "entering")
      }
      $width={width}
      {...props}
    >
      <Content ref={contentRef}>
        <StyledTypography
          color={enabled ? theme?.bg1 : theme?.grey1}
          size="16px"
        >
          {topic}
        </StyledTypography>
      </Content>
    </StyledPressable>
  );
}
