import { useEffect, useMemo, useRef, useState } from "react";

import useMomentCacheStore from "~/contexts/useMomentCacheStore";
import useMomentIdCacheStore from "~/contexts/useMomentIdCacheStore";

import API from "~/apis";

import select from "~/utils/selectAPIResult";

import type { Moment } from "common";

export default function useMomentFetch(
  topicIds: number[],
  accessToken?: string
) {
  const { momentIdCacheMap, addIds } = useMomentIdCacheStore();
  const addMoments = useMomentCacheStore((state) => state.add);

  const abortController = useRef<AbortController>(null);
  const [isLoading, setIsLoading] = useState(false);

  const isMountedRef = useRef(false);

  // 주제가 바뀌면 모멘트 불러오기
  useEffect(() => {
    if (isMountedRef.current === false) return;
    fetch();
  }, [topicIds]);

  // 컴포넌트 마운트 시 isMountingRef를 true로 설정
  useEffect(() => {
    isMountedRef.current = true;
  }, []);

  // 활성화된 주제 id 목록을 key로 사용
  const key = useMemo(
    () => Array.from(new Set(topicIds)).sort().join("-"),
    [topicIds]
  );

  // 모멘트 ID 캐시 가져오기
  const momentIdCache = useMemo(
    () => momentIdCacheMap.get(key),
    [momentIdCacheMap, key]
  );

  // 더 불러오기
  async function loadMoreMoments() {
    if (isLoading) return;

    if (momentIdCache?.completed) return;
    if (momentIdCache === undefined || momentIdCache.momentIds.length === 0)
      return await fetch();
    else return await fetch(momentIdCache.momentIds.at(-1));
  }

  // 모멘트 요청
  async function fetch(before?: number) {
    if (isLoading) return;

    setIsLoading(true);
    abortController.current?.abort();
    abortController.current = new AbortController();

    let newMoments: Moment[];
    try {
      newMoments = await API.moment
        .getMoments(
          { topicIds, before },
          accessToken,
          abortController.current.signal
        )
        .then((response) => select(response).moments);
    } catch (e) {
      if (!(e instanceof Error && e.name === "CanceledError")) throw e;
      return;
    } finally {
      setIsLoading(false);
    }

    const completed = newMoments.length < 10;
    const newIds = newMoments.map((moment) => moment.id);

    addMoments(newMoments);
    addIds(key, newIds, completed);
  }

  return {
    isLoading,
    loadMoreMoments,
  };
}
