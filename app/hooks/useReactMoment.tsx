import { useState } from "react";

import API from "~/apis";
import useMomentCacheStore from "~/contexts/useMomentCacheStore";

import type { Moment } from "common";

export default function useReactMoment(accessToken: string | null) {
  const momentStore = useMomentCacheStore();

  const [needLoginModalOpen, setNeedLoginModalOpen] = useState(false);
  const [emojiModalMoment, setEmojiModalMoment] = useState<Moment | null>(null);

  // 반응 추가 함수
  async function handleAddReaction(momentId: number, emoji: string) {
    if (accessToken === null) {
      setNeedLoginModalOpen(true);
      return;
    }

    const response = await API.moment.reactMoment(
      { momentId, emoji },
      accessToken
    );
    const { code, result, message } = response.data;

    if (code === "success" && result !== undefined) {
      momentStore.modify(momentId, {
        reactions: result.reactions,
        myEmoji: emoji,
      });
    }
  }

  // 반응 제거 함수
  async function handleRemoveReaction(momentId: number) {
    if (accessToken === null) {
      setNeedLoginModalOpen(true);
      return;
    }

    const response = await API.moment.reactMoment(
      { momentId, emoji: null },
      accessToken
    );
    const { code, result, message } = response.data;

    if (code === "success" && result !== undefined) {
      momentStore.modify(momentId, {
        reactions: result.reactions,
        myEmoji: undefined,
      });
    }
  }

  // 이모지 선택 함수
  function handleSelectEmoji(moment: Moment, emoji: string) {
    if (moment.myEmoji === emoji) handleRemoveReaction(moment.id);
    else handleAddReaction(moment.id, emoji);
    setEmojiModalMoment(null);
  }

  return {
    emojiModalMoment,
    setEmojiModalMoment,

    needLoginModalOpen,
    setNeedLoginModalOpen,

    handleAddReaction,
    handleRemoveReaction,
    handleSelectEmoji,
  };
}
