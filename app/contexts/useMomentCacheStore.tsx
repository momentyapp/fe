import { create } from "zustand";

import type { Moment } from "common";

interface State {
  momentCacheMap: Map<number, Moment>;
}

interface Actions {
  add: (moments: Moment[]) => void;
  modify: (id: number, moment: Partial<Moment>) => void;
}

type MomentCacheStore = State & Actions;

const useMomentCacheStore = create<MomentCacheStore>((set) => ({
  momentCacheMap: new Map(),

  // 모멘트 추가
  add: (newMoments) =>
    set((prev) => {
      const newMomentsCache = new Map(prev.momentCacheMap);
      newMoments.forEach((moment) => {
        newMomentsCache.set(moment.id, moment);
      });

      return {
        momentCacheMap: newMomentsCache,
      };
    }),

  // 모멘트 수정
  modify: (id, moment) =>
    set((prev) => {
      const newMomentsCache = new Map(prev.momentCacheMap);
      const target = newMomentsCache.get(id);
      if (target !== undefined) {
        newMomentsCache.set(id, { ...target, ...moment });
      }

      return {
        momentCacheMap: newMomentsCache,
      };
    }),
}));

export default useMomentCacheStore;
