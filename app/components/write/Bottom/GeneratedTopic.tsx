import { createRef, useContext, useEffect, useState, type Ref } from "react";
import { styled, ThemeContext } from "styled-components";

import Button from "~/components/common/Button";
import Typography from "~/components/common/Typography";
import Emoji from "~/components/common/Emoji";
import CircularProgress from "~/components/common/CircularProgress";

import type { TransitionStatus } from "react-transition-group";
import { MdAdd } from "react-icons/md";

const Wrapper = styled.div<{
  $in: boolean;
  $width: number;
}>`
  margin-right: ${(props) => (props.$in ? 10 : 0)}px;
  width: ${(props) => (props.$in ? props.$width + 20 : 0)}px;
  opacity: ${(props) => (props.$in ? 1 : 0)};
  transition: margin-right 0.5s cubic-bezier(0.17, 0.84, 0.44, 1),
    width 0.5s cubic-bezier(0.17, 0.84, 0.44, 1),
    opacity 0.5s cubic-bezier(0.17, 0.84, 0.44, 1);
  overflow: hidden;
  padding: 0;
  flex-shrink: 0;
  border-radius: 10px;
`;

const StyledButton = styled(Button)`
  height: 36px;
  padding: 0px 10px;
  justify-content: center;
  align-items: center;
  gap: 5px;
  flex-shrink: 0;
  border-radius: 10px;
  box-shadow: 0 0 0 1px ${(props) => props.theme.grey1} inset;
`;

const StyledTypography = styled(Typography)`
  word-break: break-all;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 5px;
`;

interface GeneratedTopicProps {
  topic: string;
  onClick: () => void;
  loading?: boolean;
  transitionStatus?: TransitionStatus;
  ref: Ref<HTMLDivElement>;
}

export default function GeneratedTopic({
  topic,
  onClick,
  loading = false,
  ref,
  transitionStatus = "entered",
}: GeneratedTopicProps) {
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
      <StyledButton
        backgroundColor={loading ? theme?.bg3 : theme?.bg1}
        icon={
          loading ? (
            <CircularProgress size={20} color={theme?.grey1} />
          ) : (
            <MdAdd size="20" color={theme?.grey1} />
          )
        }
        iconPosition="right"
        onClick={onClick}
        ref={contentRef}
        disabled={loading}
      >
        <StyledTypography color={theme?.grey1} size="16px">
          <Emoji>✨</Emoji>
          {topic}
        </StyledTypography>
      </StyledButton>
    </Wrapper>
  );
}
