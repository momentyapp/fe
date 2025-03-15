import NeedLoginModal from "~/components/common/NeedLoginModal";

import DetailModal from "./DetailModal";
import EmojiPickerModal from "./EmojiPickerModal";

import type { Moment } from "common";

interface ModalsProps {
  momentInfoModalOpen: boolean;
  momentInfo: Moment | null;
  onMomentInfoClose: () => void;

  emojiModalMoment: Moment | null;
  setEmojiModalMoment: React.Dispatch<React.SetStateAction<Moment | null>>;
  needLoginModalOpen: boolean;
  setNeedLoginModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleSelectEmoji: (moment: Moment, emoji: string) => void;
}

export default function Modals({
  momentInfoModalOpen,
  momentInfo,
  onMomentInfoClose,

  emojiModalMoment,
  setEmojiModalMoment,
  needLoginModalOpen,
  setNeedLoginModalOpen,
  handleSelectEmoji,
}: ModalsProps) {
  return (
    <>
      {/* 로그인 필요 모달 */}
      <NeedLoginModal
        isOpen={needLoginModalOpen}
        onRequestClose={() => setNeedLoginModalOpen(false)}
        message="모멘트에 반응을 남기려면 로그인해야 합니다."
      />

      {/* 모멘트 상세 모달 */}
      {momentInfo !== null && (
        <DetailModal
          moment={momentInfo}
          isOpen={momentInfoModalOpen}
          onRequestClose={() => onMomentInfoClose()}
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
    </>
  );
}
