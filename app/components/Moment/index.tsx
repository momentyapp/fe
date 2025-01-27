import { styled } from "styled-components";

import MomentModal from "~/components/MomentModal";

import My from "./My";
import Trending from "./Trending";
import Content from "./Content";
import Top from "./Top";
import Bottom from "./Bottom";

import type { Moment } from "common";
import { useState } from "react";

const Wrapper = styled.div<{ $highlight?: boolean }>`
  display: flex;
  width: 100%;
  padding: 20px 0px;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  border-radius: 15px;
  box-shadow: ${(props) =>
    props.$highlight ? `0px 0px 10px ${props.theme.primary3}` : "none"};
  background: ${(props) => props.theme.bg2};
  transition: box-shadow 0.2s;
`;

interface MomentProps {
  moment: Moment;
  my?: boolean;
  trending?: boolean;
  highlight?: boolean;
  onAddReaction?: (emoji: string) => void;
  onRemoveReaction?: () => void;
}

export default function Moment({
  moment,
  my,
  trending,
  highlight = false,
  onAddReaction,
  onRemoveReaction,
}: MomentProps) {
  const [modalOepn, setModalOpen] = useState(false);

  function handleReport() {}

  function handleDelete() {}

  return (
    <Wrapper $highlight={highlight}>
      {my && <My />}
      {trending && <Trending />}

      <Top moment={moment} onDetail={() => setModalOpen(true)} />
      <Content moment={moment} />
      <Bottom
        moment={moment}
        onAddReaction={onAddReaction}
        onRemoveReaction={onRemoveReaction}
      />

      <MomentModal
        moment={moment}
        isOpen={modalOepn}
        onRequestClose={() => setModalOpen(false)}
        onReport={handleReport}
        onDelete={handleDelete}
      />
    </Wrapper>
  );
}
