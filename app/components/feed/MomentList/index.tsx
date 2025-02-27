import { useContext } from "react";
import { styled, ThemeContext } from "styled-components";

import useMomentListState from "~/hooks/moment/useMomentListState";
import CircularProgress from "~/components/common/CircularProgress";
import SessionContext from "~/contexts/session";

import Moment from "./Moment";
import Modals from "./Modals";

import type { Moment as MomentType } from "common";

const Wrapper = styled.div`
  display: flex;
  padding: 10px;
  flex-direction: column;
  gap: 10px;
`;

const End = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface MomentListProps {
  moments: MomentType[];
  onLoadMore: () => void;
  loading: boolean;
  my?: number;
}

export default function MomentList({
  moments,
  onLoadMore,
  loading,
  my,
}: MomentListProps) {
  const session = useContext(SessionContext);
  const theme = useContext(ThemeContext);

  const {
    endRef,
    detailModalMoment,
    setDetailModalMoment,
    emojiModalMoment,
    setEmojiModalMoment,
    needLoginModalOpen,
    setNeedLoginModalOpen,
    handleAddReaction,
    handleRemoveReaction,
    handleSelectEmoji,
  } = useMomentListState(onLoadMore, session.session);

  return (
    <Wrapper>
      {moments.map((moment) => (
        <Moment
          key={moment.id}
          moment={moment}
          onDetail={setDetailModalMoment}
          onAddReaction={(emoji) => handleAddReaction(moment.id, emoji)}
          onRemoveReaction={() => handleRemoveReaction(moment.id)}
          onEmojiModalOpen={() => setEmojiModalMoment(moment)}
          my={moment.id === my}
        />
      ))}

      <End ref={endRef}>
        {loading && <CircularProgress size={36} color={theme?.grey2} />}
      </End>

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
