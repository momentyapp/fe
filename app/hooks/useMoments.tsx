import { useEffect, useMemo, useState } from "react";

import useMomentCacheStore from "~/contexts/useMomentCacheStore";
import useMomentIdCacheStore from "~/contexts/useMomentIdCacheStore";

import type { Moment } from "common";

export default function useMoments(topicIds: number[]) {
  const momentCacheMap = useMomentCacheStore((state) => state.momentCacheMap);
  const momentIdCacheMap = useMomentIdCacheStore(
    (state) => state.momentIdCacheMap
  );

  const [moments, setMoments] = useState<Moment[]>([]);
  const [count, setCount] = useState<number>(0);

  // 활성화된 주제 id 목록을 key로 사용
  const key = useMemo(
    () => Array.from(new Set(topicIds)).sort().join("-"),
    [topicIds]
  );

  // 전체 모멘트 ID 목록
  const momentIds = useMemo(
    () => momentIdCacheMap.get(key)?.momentIds,
    [momentIdCacheMap, key]
  );
  const fullCount = useMemo(() => momentIds?.length ?? 0, [momentIds]);

  // 전체 모멘트 개수가 달라질 때
  useEffect(() => {
    if (fullCount === 0) return;
    setCount((prev) => Math.min(prev, fullCount));
  }, [fullCount, setCount]);

  // momentIds에 해당하는 모멘트 목록을 count만큼 가져오기
  useEffect(() => {
    if (momentIds === undefined) return;

    const result: Moment[] = [];
    for (let i = 0; i < Math.min(count, momentIds.length); i++) {
      const id = momentIds[i];
      const moment = momentCacheMap.get(id);
      if (moment !== undefined) result.push(moment);
      else return;
    }

    setMoments(result);
  }, [momentCacheMap, momentIds, count]);

  // count 늘리기
  function showMoreMoments(count: number) {
    setCount((prev) => prev + count);
  }

  return { moments, count, fullCount, showMoreMoments };
}
