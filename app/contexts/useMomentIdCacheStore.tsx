import { create } from "zustand";

import mergeDescendingUnique from "~/utils/mergeDescendingUnique";

interface MomentIdCache {
  momentIds: number[];
  completed: boolean;
}

interface State {
  momentIdCacheMap: Map<string, MomentIdCache>;
}

interface Actions {
  addIds: (key: string, ids: number[], completed?: boolean) => void;
  addId: (key: string, id: number) => void;
}

type MomentIdCacheStore = State & Actions;

const useMomentIdCacheStore = create<MomentIdCacheStore>((set) => ({
  momentIdCacheMap: new Map(),

  // 모멘트 ID 목록 추가
  addIds: (key, ids, completed = false) =>
    set((prev) => {
      const newMomentIdCache = new Map(prev.momentIdCacheMap);
      const target = newMomentIdCache.get(key);
      const prevIds = target?.momentIds ?? [];

      let resultIds: number[];
      // ids의 마지막 id가 prevIds의 처음 id보다 클 때
      // 기존 id 목록 제거
      if (
        prevIds.length > 0 &&
        ids.length > 0 &&
        ids[ids.length - 1] > prevIds[0]
      ) {
        completed = false;
        resultIds = ids;
      } else {
        resultIds = mergeDescendingUnique(prevIds, ids);
      }

      newMomentIdCache.set(key, {
        ...target,
        momentIds: resultIds,
        completed,
      });

      return {
        momentIdCacheMap: newMomentIdCache,
      };
    }),

  // 모멘트 ID 추가
  addId: (key, id) =>
    set((prev) => {
      const newMomentIdCache = new Map(prev.momentIdCacheMap);
      const target = newMomentIdCache.get(key);
      const prevIds = target?.momentIds ?? [];

      const resultIds = mergeDescendingUnique(prevIds, [id]);

      newMomentIdCache.set(key, {
        completed: false,
        ...target,
        momentIds: resultIds,
      });

      return {
        momentIdCacheMap: newMomentIdCache,
      };
    }),
}));

export default useMomentIdCacheStore;
