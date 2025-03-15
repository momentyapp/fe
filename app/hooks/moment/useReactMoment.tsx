import { useContext, useState } from "react";

import API from "~/apis";
import CacheContext from "~/contexts/cache";

import type { Moment } from "common";

export default function useReactMoment(accessToken: string | null) {
  const cache = useContext(CacheContext);

  const [emojiModalMoment, setEmojiModalMoment] = useState<Moment | null>(null);

  // 로그인 필요 모달
  const [needLoginModalOpen, setNeedLoginModalOpen] = useState(false);

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
      const moments = [...cache.moments];
      const index = moments.findIndex((moment) => moment.id === momentId);
      if (index === -1) return;
      moments[index].reactions = result.reactions;
      moments[index].myEmoji = emoji;
      cache.setMoments(moments);
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
      const moments = [...cache.moments];
      const index = moments.findIndex((moment) => moment.id === momentId);
      if (index === -1) return;
      moments[index].reactions = result.reactions;
      moments[index].myEmoji = undefined;
      cache.setMoments(moments);
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
