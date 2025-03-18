import { create } from "zustand";

import type { Topic } from "common";

interface State {
  trendingTopics: Topic[];
}

interface Actions {
  setTrending: (trendingTopics: Topic[]) => void;
}

type TopicStore = State & Actions;

const useTopicStore = create<TopicStore>((set) => ({
  trendingTopics: [],

  setTrending: (trendingTopics) => set({ trendingTopics }),
}));

export default useTopicStore;
