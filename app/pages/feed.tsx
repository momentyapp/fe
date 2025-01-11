import { useState } from "react";

import AppBar from "~/components/AppBar";
import TopicFilter from "~/components/TopicFilter";

import type { Topic } from "common";

const sampleTopics: Topic[] = [
  { topic: "매일우유", id: 0, enabled: false },
  { topic: "국회의사당역", id: 1, enabled: false },
  { topic: "탄핵", id: 2, enabled: false },
  { topic: "시위", id: 3, enabled: false },
  { topic: "코로나19", id: 4, enabled: false },
  { topic: "백신", id: 5, enabled: false },
];

export default function Feed() {
  const [topics, setTopics] = useState<Topic[]>(sampleTopics);

  return (
    <>
      {/* 앱 바 */}
      <AppBar />

      {/* 주제 목록 */}
      <TopicFilter topics={topics} setTopics={setTopics} />
    </>
  );
}
