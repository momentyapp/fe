import { useContext, useMemo } from "react";
import { styled, ThemeContext } from "styled-components";

import useReactMoment from "~/hooks/useReactMoment";
import useMomentInfoState from "~/hooks/useMomentInfoState";
import useOnVisible from "~/hooks/useOnVisible";

import CircularProgress from "~/components/common/CircularProgress";
import NeedLoginModal from "~/components/common/NeedLoginModal";

import useSession from "~/contexts/useSession";

import EmojiPickerModal from "./EmojiPickerModal";
import InfoModal from "./InfoModal";
import Moment from "./Moment";

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
  onMomentVisible?: (momentId: number) => void;
  onMomentInvisible?: (momentId: number) => void;
}

export default function MomentList({
  moments,
  onLoadMore,
  loading,
  onMomentVisible,
  onMomentInvisible,
}: MomentListProps) {
  const session = useSession();
  const theme = useContext(ThemeContext);

  const accessToken = useMemo(
    () => session?.accessToken?.token ?? null,
    [session]
  );

  const observe = useOnVisible(onVisible, onInvisible);

  function onVisible(entry: IntersectionObserverEntry) {
    const momentId = parseInt(entry.target.id.split("moment-")[1]);
    onMomentVisible?.(momentId);
  }

  function onInvisible(entry: IntersectionObserverEntry) {
    const momentId = parseInt(entry.target.id.split("moment-")[1]);
    onMomentInvisible?.(momentId);
  }

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

  const endRef = useOnVisible(onLoadMore);

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
          onVisible={() => onMomentVisible?.(moment.id)}
          onInvisible={() => onMomentInvisible?.(moment.id)}
          ref={observe}
          id={`moment-${moment.id}`}
        />
      ))}

      {/* 모멘트 목록 끝 */}
      <End ref={endRef}>
        {loading && <CircularProgress size={36} color={theme?.grey2} />}
      </End>

      {/* 로그인 필요 모달 */}
      <NeedLoginModal
        isOpen={needLoginModalOpen}
        onRequestClose={() => setNeedLoginModalOpen(false)}
        message="모멘트에 반응을 남기려면 로그인해야 합니다."
      />

      {/* 모멘트 상세 모달 */}
      {momentInfo !== null && (
        <InfoModal
          moment={momentInfo}
          isOpen={momentInfoModalOpen}
          onRequestClose={handleMomentInfoClose}
          onReport={() => {}}
          onDelete={() => {}}
        />
      )}

      {/* 이모지 피커 모달 */}
      <EmojiPickerModal
        isOpen={emojiModalMoment !== null}
        onRequestClose={() => setEmojiModalMoment(null)}
        myEmoji={emojiModalMoment?.myEmoji}
        onSelect={(emoji) =>
          emojiModalMoment && handleSelectEmoji(emojiModalMoment, emoji)
        }
      />
    </Wrapper>
  );
}
