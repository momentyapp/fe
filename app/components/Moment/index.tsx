import { createRef, useEffect, useState, type Ref } from "react";
import { styled } from "styled-components";

import My from "./My";
import Trending from "./Trending";
import Content from "./Content";
import Top from "./Top";
import Bottom from "./Bottom";

import type { Moment } from "common";
import type { TransitionStatus } from "react-transition-group";

const Wrapper = styled.div<{
  $in: boolean;
  $height: number;
  $highlight?: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-radius: 15px;
  margin-bottom: ${(props) => (props.$in ? 10 : 0)}px;
  height: ${(props) => (props.$in ? props.$height + 40 : 0)}px;
  opacity: ${(props) => (props.$in ? 1 : 0)};
  transition: margin-bottom 0.5s cubic-bezier(0.17, 0.84, 0.44, 1),
    height 0.5s cubic-bezier(0.17, 0.84, 0.44, 1),
    opacity 0.5s cubic-bezier(0.17, 0.84, 0.44, 1), box-shadow 0.2s;
  overflow: hidden;
  box-shadow: ${(props) =>
    props.$highlight ? `0px 0px 10px ${props.theme.primary3}` : "none"};
`;

const MomentContent = styled.div`
  flex-shrink: 0;
  display: flex;
  width: 100%;
  padding: 20px 0px;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  border-radius: 15px;
  background: ${(props) => props.theme.bg2};
`;

interface MomentProps {
  moment: Moment;
  my?: boolean;
  trending?: boolean;
  highlight?: boolean;
  ref?: Ref<HTMLDivElement>;
  transitionStatus?: TransitionStatus;
  onDetail: (moment: Moment) => void;
  onAddReaction: (emoji: string) => void;
  onRemoveReaction: () => void;
  onEmojiModalOpen: () => void;
}

export default function Moment({
  moment,
  my,
  trending,
  highlight = false,
  ref,
  transitionStatus = "entered",
  onDetail,
  onAddReaction,
  onRemoveReaction,
  onEmojiModalOpen,
}: MomentProps) {
  const [height, setHeight] = useState(0);
  const contentRef = createRef<HTMLDivElement>();

  useEffect(() => {
    if (contentRef.current === null) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        console.log(entry.contentRect);
        setHeight(entry.contentRect.height);
      }
    });
    observer.observe(contentRef.current);
    return () => observer.disconnect();
  }, [contentRef]);

  return (
    <Wrapper
      $highlight={highlight}
      $in={
        height > 0 &&
        (transitionStatus === "entered" || transitionStatus === "entering")
      }
      $height={height}
      ref={ref}
    >
      <MomentContent ref={contentRef}>
        {my && <My />}
        {trending && <Trending />}

        <Top moment={moment} onDetail={() => onDetail(moment)} />
        <Content moment={moment} />
        <Bottom
          moment={moment}
          onAddReaction={onAddReaction}
          onRemoveReaction={onRemoveReaction}
          onEmojiModalOpen={onEmojiModalOpen}
        />
      </MomentContent>
    </Wrapper>
  );
}
