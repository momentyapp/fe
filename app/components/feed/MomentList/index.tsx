import { useMemo, useState } from "react";
import { styled } from "styled-components";
import { AnimatePresence } from "motion/react";

import useReactMoment from "~/hooks/useReactMoment";

import NeedLoginModal from "~/components/common/NeedLoginModal";

import useSession from "~/contexts/useSession";

import EmojiPickerModal from "./EmojiPickerModal";
import InfoModal from "./InfoModal";
import Moment from "./Moment";
import End from "./End";

import type { Moment as MomentType } from "common";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

interface MomentListProps {
  moments: MomentType[];
  loading: boolean;
  setAnchor?: (momentId: number) => void;
  onScrollEnd: () => void;
  onMomentVisible?: (momentId: number) => void;
  onMomentInvisible?: (momentId: number) => void;
}

export default function MomentList({
  moments,
  loading,
  setAnchor,
  onScrollEnd,
  onMomentVisible,
  onMomentInvisible,
}: MomentListProps) {
  const session = useSession();

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

  const [momentInfoModalOpen, setMomentInfoModalOpen] = useState(false);
  const [momentInfo, setMomentInfo] = useState<MomentType | null>(null);

  function handleMomentInfoOpen(moment: MomentType) {
    setMomentInfo(moment);
    setMomentInfoModalOpen(true);
  }

  function handleMomentInfoClose() {
    setMomentInfoModalOpen(false);
  }

  return (
    <Wrapper>
      <AnimatePresence mode="popLayout">
        {moments.map((moment) => (
          <Moment
            key={moment.id}
            moment={moment}
            onInfo={handleMomentInfoOpen}
            onAddReaction={handleAddReaction}
            onRemoveReaction={handleRemoveReaction}
            onEmojiModalOpen={setEmojiModalMoment}
            onTopicClick={() => setAnchor?.(moment.id)}
            onInView={onMomentVisible}
            onOutView={onMomentInvisible}
            id={`moment-${moment.id}`}
          />
        ))}
      </AnimatePresence>

      {/* 모멘트 목록 끝 */}
      <End onTrigger={onScrollEnd} isLoading={loading} />

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
