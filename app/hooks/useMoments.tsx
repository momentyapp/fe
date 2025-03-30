import { useEffect, useMemo, useRef, useState } from "react";
import { io } from "socket.io-client";

import useMomentStore from "~/contexts/useMomentStore";

import select from "~/utils/selectAPIResult";
import mergeDescendingUnique from "~/utils/mergeDescendingUnique";

import API from "~/apis";

import type { Moment } from "common";

const socket = io(`${import.meta.env.VITE_HOST}`, {
  path: "/socket",
  transports: ["websocket"],
});

interface UseMomentsProps {
  topicIds?: number[];
  accessToken?: string;
  onNewMoment?: (moment: Moment) => void;
}

export default function useMoments({
  topicIds = [],
  accessToken,
  onNewMoment,
}: UseMomentsProps = {}) {
  const momentStore = useMomentStore();
  const observingMoments = useRef<Set<number>>(new Set());

  const [isLoading, setIsLoading] = useState(false);

  // 활성화된 주제 id 목록을 key로 사용
  const key = useMemo(
    () => Array.from(new Set(topicIds)).sort().join("-"),
    [topicIds]
  );

  // 소켓 연결
  useEffect(() => {
    socket.connect();

    // 새로운 모멘트 수신
    socket.on("new_moment", (moment: Moment) => {
      momentStore.add([moment]);
      onNewMoment?.(moment);

      setTable((prev) => ({
        ...prev,
        [key]: mergeDescendingUnique(prev[key] ?? [], [moment.id]),
      }));
    });

    // 모멘트 수정 수신
    socket.on("modify_moment", (momentId: number, moment: Partial<Moment>) => {
      momentStore.modify(momentId, moment);
    });

    return () => {
      socket.off("new_moment");
      socket.off("modify_moment");
      socket.disconnect();
    };
  }, [key]);

  // 주제 id 목록이 변경될 때
  useEffect(() => {
    socket.emit("set_topic", topicIds);
    fetch();
  }, [topicIds]);

  // 주기적으로 모멘트 id 목록 전송
  useEffect(() => {
    const interval = setInterval(() => {
      socket.emit("set_moment", Array.from(observingMoments.current));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // 활성화된 주제 id 목록과 모멘트 id 목록 매핑
  const [table, setTable] = useState<Record<string, number[]>>({});
  const completed = useRef<Set<string>>(new Set());

  const latestsMoments = useRef<Moment[]>([]);

  // key에 해당하는 모멘트 목록
  const moments = useMemo(() => {
    if (isLoading) return latestsMoments.current;
    if (!(key in table)) return [];

    const result: Moment[] = [];
    for (const id of table[key]) {
      const moment = momentStore.moments[id];
      if (moment !== undefined) result.push(moment);
    }

    latestsMoments.current = result;
    return result;
  }, [table, key, momentStore.moments, isLoading]);

  // 더 불러오기
  async function loadMore() {
    if (isLoading) return;
    if (completed.current.has(key)) return;
    if (table[key] === undefined || table[key].length === 0) await fetch();
    else await fetch(table[key].at(-1));
  }

  // 모멘트 목록 불러오기
  async function fetch(before?: number) {
    const prevIds = table[key] ?? [];

    setIsLoading(true);
    const newMoments = await API.moment
      .getMoments({ topicIds, before }, accessToken)
      .then((response) => select(response).moments);
    setIsLoading(false);

    if (newMoments.length < 10) {
      completed.current.add(key);
    }

    const newIds = newMoments.map((moment) => moment.id);

    momentStore.add(newMoments);

    // newIds의 마지막 id가 prevIds의 처음 id보다 클 때
    // 기존 id 목록 제거
    if (
      prevIds.length > 0 &&
      newIds.length > 0 &&
      newIds[newIds.length - 1] > prevIds[0]
    ) {
      completed.current.delete(key);
      setTable((prev) => ({ ...prev, [key]: newIds }));
    } else {
      const ids = mergeDescendingUnique(prevIds, newIds);
      setTable((prev) => ({ ...prev, [key]: ids }));
    }
  }

  // 모멘트가 뷰포트에 들어올 때
  async function observeMoment(momentId: number) {
    observingMoments.current.add(momentId);
  }

  // 모멘트가 뷰포트에서 나갈 때
  async function unobserveMoment(momentId: number) {
    observingMoments.current.delete(momentId);
  }

  return {
    moments,
    isLoading,
    loadMore,
    observeMoment,
    unobserveMoment,
  };
}
