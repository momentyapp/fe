import { useCallback, useMemo, useState } from "react";

import API from "~/apis";

import type { Moment } from "common";
import type { Session } from "~/contexts/session";

export default function useMomentListState(
  onLoadMore: () => void,
  session?: Session
) {
  const [detailModalMoment, setDetailModalMoment] = useState<Moment | null>(
    null
  );
  const [emojiModalMoment, setEmojiModalMoment] = useState<Moment | null>(null);
  const [needLoginModalOpen, setNeedLoginModalOpen] = useState(false);

  const accessToken = useMemo(() => session?.accessToken?.token, [session]);

  const observer = useMemo(
    () =>
      new IntersectionObserver(
        (entries) => {
          if (entries[entries.length - 1].isIntersecting) onLoadMore();
        },
        { threshold: 0.01 }
      ),
    [onLoadMore]
  );

  const moreTrggierRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (node !== null) {
        observer.observe(node);
      } else {
        observer.disconnect();
      }
    },
    [observer]
  );

  // 반응 추가 함수
  function handleAddReaction(momentId: number, emoji: string) {
    if (accessToken === undefined) {
      setNeedLoginModalOpen(true);
      return;
    }

    API.moment.reactMoment({ momentId, emoji }, accessToken);
  }

  // 반응 제거 함수
  function handleRemoveReaction(momentId: number) {
    if (accessToken === undefined) {
      setNeedLoginModalOpen(true);
      return;
    }

    API.moment.reactMoment({ momentId, emoji: null }, accessToken);
  }

  // 이모지 선택 함수
  function handleSelectEmoji(moment: Moment, emoji: string) {
    if (moment.myEmoji === emoji) handleRemoveReaction(moment.id);
    else handleAddReaction(moment.id, emoji);
    setEmojiModalMoment(null);
  }

  return {
    endRef: moreTrggierRef,
    detailModalMoment,
    setDetailModalMoment,
    emojiModalMoment,
    setEmojiModalMoment,
    needLoginModalOpen,
    setNeedLoginModalOpen,
    handleAddReaction,
    handleRemoveReaction,
    handleSelectEmoji,
  };
}
