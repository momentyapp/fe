import { useContext } from "react";
import { styled } from "styled-components";

import useMomentListState from "~/hooks/moment/useMomentListState";
import SessionContext from "~/contexts/session";

import Moment from "./Moment";
import Modals from "./Modals";

import type { Moment as MomentType } from "common";

const Wrapper = styled.div`
  display: flex;
  padding: 10px 10px 100px 10px;
  flex-direction: column;
  gap: 10px;
`;

interface MomentListProps {
  moments: MomentType[];
  setMoments: React.Dispatch<React.SetStateAction<MomentType[]>>;
  onLoadMore: () => Promise<void>;
  my?: number;
}

export default function MomentList({
  moments,
  setMoments,
  onLoadMore,
  my,
}: MomentListProps) {
  const session = useContext(SessionContext);

  const {
    lastMomentRef,
    detailModalMoment,
    setDetailModalMoment,
    emojiModalMoment,
    setEmojiModalMoment,
    needLoginModalOpen,
    setNeedLoginModalOpen,
    handleAddReaction,
    handleRemoveReaction,
    handleSelectEmoji,
  } = useMomentListState(session.session);

  return (
    <Wrapper>
      {moments.map((moment, index) => (
        <Moment
          key={moment.id}
          moment={moment}
          onDetail={setDetailModalMoment}
          onAddReaction={(emoji) => handleAddReaction(moment.id, emoji)}
          onRemoveReaction={() => handleRemoveReaction(moment.id)}
          onEmojiModalOpen={() => setEmojiModalMoment(moment)}
          my={moment.id === my}
          ref={index === moments.length - 1 ? lastMomentRef : undefined}
        />
      ))}

      <Modals
        detailModalMoment={detailModalMoment}
        setDetailModalMoment={setDetailModalMoment}
        emojiModalMoment={emojiModalMoment}
        setEmojiModalMoment={setEmojiModalMoment}
        needLoginModalOpen={needLoginModalOpen}
        setNeedLoginModalOpen={setNeedLoginModalOpen}
        handleSelectEmoji={handleSelectEmoji}
      />
    </Wrapper>
  );
}
