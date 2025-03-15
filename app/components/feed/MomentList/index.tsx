import { useContext, useMemo } from "react";
import { styled, ThemeContext } from "styled-components";

import useReactMoment from "~/hooks/moment/useReactMoment";
import useMomentInfoState from "~/hooks/moment/useMomentInfoState";
import useInfiniteMoments from "~/hooks/moment/useInfiniteMoments";

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

  const accessToken = useMemo(
    () => session?.accessToken?.token ?? null,
    [session]
  );

  const {
    emojiModalMoment,
    setEmojiModalMoment,
    needLoginModalOpen,
    setNeedLoginModalOpen,
    handleAddReaction,
    handleRemoveReaction,
    handleSelectEmoji,
  } = useReactMoment(accessToken);

  const {
    momentInfoModalOpen,
    momentInfo,
    handleMomentInfoOpen,
    handleMomentInfoClose,
  } = useMomentInfoState();

  const { observeEnd } = useInfiniteMoments(onLoadMore);

  return (
    <Wrapper>
      {moments.map((moment) => (
        <Moment
          key={moment.id}
          moment={moment}
          onInfo={handleMomentInfoOpen}
          onAddReaction={(emoji) => handleAddReaction(moment.id, emoji)}
          onRemoveReaction={() => handleRemoveReaction(moment.id)}
          onEmojiModalOpen={() => setEmojiModalMoment(moment)}
          my={moment.id === my}
        />
      ))}

      <End ref={observeEnd}>
        {loading && <CircularProgress size={36} color={theme?.grey2} />}
      </End>

      <Modals
        momentInfoModalOpen={momentInfoModalOpen}
        momentInfo={momentInfo}
        onMomentInfoClose={handleMomentInfoClose}
        emojiModalMoment={emojiModalMoment}
        setEmojiModalMoment={setEmojiModalMoment}
        needLoginModalOpen={needLoginModalOpen}
        setNeedLoginModalOpen={setNeedLoginModalOpen}
        handleSelectEmoji={handleSelectEmoji}
      />
    </Wrapper>
  );
}
