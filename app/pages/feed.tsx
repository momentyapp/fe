import { useState } from "react";

import AppBar from "~/components/AppBar";
import TopicFilter from "~/components/TopicFilter";
import MomentContainer from "~/components/MomentContainer";

import type { Moment as MomentType, Topic } from "common";

const sampleTopics: Topic[] = [
  { topic: "매일우유", id: 0, enabled: false },
  { topic: "국회의사당역", id: 1, enabled: false },
  { topic: "탄핵", id: 2, enabled: false },
  { topic: "시위", id: 3, enabled: false },
  { topic: "코로나19", id: 4, enabled: false },
  { topic: "백신", id: 5, enabled: false },
];

const sampleMoments: MomentType[] = [
  {
    id: 1,
    author: {
      id: 1,
      username: "사용자",
      createdAt: "2023-01-01T00:00:00Z",
      photo: "https://picsum.photos/200",
    },
    createdAt: "2023-10-01T12:00:00Z",
    body: {
      text: `식품의약품안전처는 이미 및 이취 등이 감지된 매일우유 제품을 판매 중단하고 회수한다고 오늘(13일) 밝혔습니다.

대상 제품은 매일유업 광주 공장에서 제조한 ‘메일우유’이며, 소비 기한은 내년 2월 16일입니다.`,
      photos: ["https://picsum.photos/400/200", "https://picsum.photos/350"],
    },
    topics: [
      { topic: "매일우유", id: 0 },
      { topic: "코로나19", id: 4 },
    ],
    reactions: {
      "🤣": 10,
      "👍": 5,
    },
    expiresAt: "2023-10-02T12:00:00Z",
    myEmoji: "👍",
  },
  {
    id: 2,
    createdAt: "2023-10-02T12:00:00Z",
    body: {
      text: "두 번째 게시글입니다.",
    },
    topics: [
      { topic: "국회의사당역", id: 1 },
      { topic: "백신", id: 5 },
    ],
    reactions: {
      "😉": 20,
      "👏": 3,
    },
  },
];

export default function Feed() {
  const [topics, setTopics] = useState<Topic[]>(sampleTopics);
  const [moments, setMoments] = useState<MomentType[]>(sampleMoments);

  return (
    <>
      {/* 앱 바 */}
      <AppBar />

      {/* 주제 목록 */}
      <TopicFilter topics={topics} setTopics={setTopics} />

      {/* 모멘트 */}
      <MomentContainer moments={moments} setMoments={setMoments} />
    </>
  );
}
