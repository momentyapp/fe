import { useEffect, useState } from "react";
import { io } from "socket.io-client";

import useMomentCacheStore from "~/contexts/useMomentCacheStore";
import useMomentIdCacheStore from "~/contexts/useMomentIdCacheStore";

import useIsScrolling from "~/hooks/useIsScrolling";

import type { Moment } from "common";

const socket = io(`${import.meta.env.VITE_HOST}`, {
  path: "/socket",
  transports: ["websocket"],
});

export default function useMomentSocket(
  topicIds: number[],
  onNewMoment?: (moment: Moment) => void
) {
  const momentCacheStore = useMomentCacheStore();
  const momentIdCacheStore = useMomentIdCacheStore();
  const isScrolling = useIsScrolling();

  const [observingMomentIds, setObservingMomentIds] = useState<number[]>([]);
  const [key, setKey] = useState<string>("");

  // 소켓 연결
  useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, []);

  // 소켓 이벤트 수신
  useEffect(() => {
    // 새로운 모멘트 수신
    socket.on("new_moment", (moment: Moment) => {
      momentCacheStore.add([moment]);
      momentIdCacheStore.addId(key, moment.id);
      onNewMoment?.(moment);
    });

    // 모멘트 수정 수신
    socket.on("modify_moment", (momentId: number, moment: Partial<Moment>) => {
      momentCacheStore.modify(momentId, moment);
    });

    return () => {
      socket.removeAllListeners();
    };
  }, [key, momentCacheStore]);

  // 주제 id 목록이 변경될 때
  useEffect(() => {
    const newKey = Array.from(new Set(topicIds)).sort().join("-");
    setKey(newKey);

    socket.emit("set_topic", topicIds);
  }, [topicIds]);

  // 특정 조건에 관찰 모멘트 전송
  useEffect(() => {
    if (isScrolling) return;
    socket.emit("observe_moments", observingMomentIds);
  }, [observingMomentIds, isScrolling]);

  // 모멘트가 뷰포트에 들어올 때
  async function observeMoment(momentId: number) {
    setObservingMomentIds((prev) => {
      if (prev.includes(momentId)) return prev;
      return [...prev, momentId];
    });
  }

  // 모멘트가 뷰포트에서 나갈 때
  async function unobserveMoment(momentId: number) {
    setObservingMomentIds((prev) => prev.filter((id) => id !== momentId));
  }

  return {
    observeMoment,
    unobserveMoment,
  };
}
