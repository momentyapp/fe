import { useCallback, useEffect, useRef, useState } from "react";

import API from "~/apis";

import type { Moment, Session } from "common";

export default function useMomentListState(
  moments: Moment[],
  onLoadMore: (before: number) => void,
  session?: Session
) {
  const [detailModalMoment, setDetailModalMoment] = useState<Moment | null>(
    null
  );
  const [emojiModalMoment, setEmojiModalMoment] = useState<Moment | null>(null);
  const [needLoginModalOpen, setNeedLoginModalOpen] = useState(false);

  const visible = useRef(false);

  const observer = useRef(
    new IntersectionObserver(
      (entries) => {
        if (entries[entries.length - 1].isIntersecting) handleVisible();
        else handleInvisible();
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

  // 모멘트가 변경됐을 때
  useEffect(() => {
    if (visible.current) handleVisible();
  }, [moments]);

  // 마지막 모멘트가 보일 때
  function handleVisible() {
    console.log("handle visible");
    visible.current = true;
    const lastMoment = moments[moments.length - 1];
    if (lastMoment === undefined) return;
    onLoadMore(lastMoment.id);
  }

  // 마지막 모멘트가 안 보일 때
  function handleInvisible() {
    visible.current = false;
  }

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
