import { create } from "zustand";

import type { Moment } from "common";

interface State {
  moments: Moment[];
}

interface Actions {
  add: (moments: Moment[]) => void;
  modify: (id: number, moment: Partial<Moment>) => void;
}

type MomentStore = State & Actions;

const useMomentStore = create<MomentStore>((set) => ({
  moments: [],

  // 모멘트 추가
  add: (newMoments) =>
    // newMoments는 id로 내림차순 정렬되어 있다고 가정
    // prevMoments는 id로 내림차순 정렬되어 있다고 가정
    set((prev) => {
      const prevMoments = prev.moments;
      const result: Moment[] = [];
      let a = 0;
      let b = 0;

      while (a < prevMoments.length || b < newMoments.length) {
        const prevMoment = prevMoments[a];
        const newMoment = newMoments[b];

        if (a < prevMoments.length && b < newMoments.length) {
          if (prevMoment.id > newMoment.id) {
            result.push(prevMoment);
            a++;
          } else if (prevMoment.id < newMoment.id) {
            result.push(newMoment);
            b++;
          } else {
            result.push(newMoment);
            a++;
            b++;
          }
        } else if (a < prevMoments.length) {
          result.push(prevMoment);
          a++;
        } else if (b < newMoments.length) {
          result.push(newMoment);
          b++;
        }
      }

      return {
        moments: result,
      };
    }),

  // 모멘트 수정
  modify: (id, moment) =>
    set((prev) => {
      // 이분 탐색을 통해 id에 해당하는 모멘트를 찾기
      let index = -1;
      let left = 0;
      let right = prev.moments.length - 1;
      while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (prev.moments[mid].id === id) {
          index = mid;
          break;
        } else if (prev.moments[mid].id < id) {
          left = mid + 1;
        } else {
          right = mid - 1;
        }
      }

      // id에 해당하는 모멘트가 없으면 이전 상태 그대로 반환
      if (index === -1) {
        return prev;
      }

      const newMoments = [...prev.moments];
      newMoments[index] = {
        ...newMoments[index],
        ...moment,
      };

      return {
        moments: newMoments,
      };
    }),
}));

export default useMomentStore;
