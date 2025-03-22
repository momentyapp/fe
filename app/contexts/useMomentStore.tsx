import { create } from "zustand";

import type { Moment } from "common";

interface State {
  moments: Record<number, Moment>;
}

interface Actions {
  add: (moments: Moment[]) => void;
  modify: (id: number, moment: Partial<Moment>) => void;
}

type MomentStore = State & Actions;

const useMomentStore = create<MomentStore>((set) => ({
  moments: {},

  // 모멘트 추가
  add: (newMoments) =>
    set((prev) => {
      const newMomentsMap = newMoments.reduce<Record<number, Moment>>(
        (acc, moment) => ({ ...acc, [moment.id]: moment }),
        {}
      );

      return {
        moments: {
          ...prev.moments,
          ...newMomentsMap,
        },
      };
    }),

  // 모멘트 수정
  modify: (id, moment) =>
    set((prev) => ({
      moments: {
        ...prev.moments,
        [id]: {
          ...prev.moments[id],
          ...moment,
        },
      },
    })),
}));

export default useMomentStore;
