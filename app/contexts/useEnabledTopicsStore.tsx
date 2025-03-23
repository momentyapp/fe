import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { Topic } from "common";
import type React from "react";

interface States {
  enabledTopics: Topic[];
}

interface Actions {
  setEnabledTopics: React.Dispatch<React.SetStateAction<Topic[]>>;
}

export type EnabledTopics = States & Actions;

const useEnabledTopicsStore = create<EnabledTopics>()(
  persist(
    (set) => ({
      enabledTopics: [],
      setEnabledTopics: (enabledTopics) => {
        if (Array.isArray(enabledTopics)) {
          set({ enabledTopics });
        } else {
          set((prev) => ({
            ...prev,
            enabledTopics: enabledTopics(prev.enabledTopics),
          }));
        }
      },
    }),
    { name: "enabled-topics" }
  )
);

export default useEnabledTopicsStore;
