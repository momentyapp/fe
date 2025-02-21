import { useCallback, useEffect, useRef, useState } from "react";

import API from "~/apis";

import type { Moment, Session } from "common";

export default function useMomentListState(session?: Session) {
  const [detailModalMoment, setDetailModalMoment] = useState<Moment | null>(
    null
  );
  const [emojiModalMoment, setEmojiModalMoment] = useState<Moment | null>(null);

  const [needLoginModalOpen, setNeedLoginModalOpen] = useState(false);

  const observer = useRef(
    new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) console.log("visible");
      },
      { threshold: 0.01 }
    )
  );

  // 마지막 모멘트가 보이는지 감지
  const handleLastMomentHit = useCallback((node: HTMLDivElement | null) => {
    if (observer.current === null) return;
    if (node !== null) {
      observer.current.observe(node);
    } else {
      observer.current.disconnect();
    }
  }, []);

  // 반응 추가 함수
  function handleAddReaction(momentId: number, emoji: string) {
    if (session === undefined) {
      setNeedLoginModalOpen(true);
      return;
    }

    API.moment.reactMoment({ momentId, emoji }, session.accessToken.token);
  }

  // 반응 제거 함수
  function handleRemoveReaction(momentId: number) {
    if (session === undefined) {
      setNeedLoginModalOpen(true);
      return;
    }

    API.moment.reactMoment(
      { momentId, emoji: null },
      session.accessToken.token
    );
  }

  // 이모지 선택 함수
  function handleSelectEmoji(moment: Moment, emoji: string) {
    if (moment.myEmoji === emoji) handleRemoveReaction(moment.id);
    else handleAddReaction(moment.id, emoji);
    setEmojiModalMoment(null);
  }

  return {
    handleLastMomentHit,
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
