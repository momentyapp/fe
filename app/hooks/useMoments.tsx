import { useMemo, useRef, useState } from "react";

import useMomentStore from "~/contexts/useMomentStore";
import select from "~/utils/selectAPIResult";

import API from "~/apis";

import type { Moment } from "common";

export default function useMoments(
  topicIds: number[] = [],
  accessToken?: string
) {
  const momentStore = useMomentStore();

  const [isLoading, setIsLoading] = useState(false);

  // 활성화된 주제 id 목록을 key로 사용
  const key = useMemo(
    () => Array.from(new Set(topicIds)).sort().join("-"),
    [topicIds]
  );

  // 활성화된 주제 id 목록과 모멘트 id 목록 매핑
  const [table, setTable] = useState<Record<string, number[]>>({});
  const completed = useRef<Set<string>>(new Set());

  // key에 해당하는 모멘트 목록
  const moments = useMemo(() => {
    if (!(key in table)) return [];

    const result: Moment[] = [];
    for (const id of table[key]) {
      const moment = momentStore.moments[id];
      if (moment !== undefined) result.push(moment);
    }

    return result;
  }, [table, key, momentStore.moments]);

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

    if (newMoments.length === 0) {
      completed.current.add(key);
      return;
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
      const ids: number[] = [];
      let i = 0;
      let j = 0;

      while (i < prevIds.length || j < newIds.length) {
        const prevId = i < prevIds.length ? prevIds[i] : undefined;
        const newId = j < newIds.length ? newIds[j] : undefined;

        let currentId: number | undefined;

        if (prevId !== undefined && (newId === undefined || prevId > newId)) {
          currentId = prevId;
          i++;
        } else if (
          newId !== undefined &&
          (prevId === undefined || newId > prevId)
        ) {
          currentId = newId;
          j++;
        } else if (
          prevId !== undefined &&
          newId !== undefined &&
          prevId === newId
        ) {
          currentId = prevId;
          i++;
          j++;
        }

        if (
          currentId !== undefined &&
          (ids.length === 0 || ids[ids.length - 1] !== currentId)
        ) {
          ids.push(currentId);
        }
      }

      setTable((prev) => ({ ...prev, [key]: ids }));
    }
  }

  return { moments, isLoading, loadMore };
}
