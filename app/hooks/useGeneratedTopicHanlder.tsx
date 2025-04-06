import { useState } from "react";

import API from "~/apis";

import type { Topic, GeneratedTopic } from "common";

interface UseGeneratedTopicHandlerProps {
  setGeneratedTopics: React.Dispatch<React.SetStateAction<GeneratedTopic[]>>;
  setTopics: React.Dispatch<React.SetStateAction<Topic[]>>;
}

export default function useGeneratedTopicHandler({
  setGeneratedTopics,
  setTopics,
}: UseGeneratedTopicHandlerProps) {
  const [loadings, setLoadings] = useState<Set<string>>(new Set());

  // 생성된 주제를 추가하는 함수
  async function handleAddGeneratedTopic(topic: GeneratedTopic) {
    let topicToAdd: Topic;

    // 알려진 주제인 경우
    if (topic.known) {
      topicToAdd = {
        name: topic.name,
        id: topic.id ?? 0,
        usage: topic.usage ?? 0,
        trending: topic.trending,
      };
    }
    // 알려지지 않은 주제인 경우
    else {
      // 주제 추가 API 호출
      setLoadings((prevLoadings) => new Set(prevLoadings).add(topic.name));

      const response = await API.topic.createTopic({ topic: topic.name });

      setLoadings((prevLoadings) => {
        const newLoadings = new Set(prevLoadings);
        newLoadings.delete(topic.name);
        return newLoadings;
      });
      const { code, message, result } = response.data;

      // 주제 추가 실패
      if (code !== "success" || result === undefined) return;

      topicToAdd = {
        name: topic.name,
        id: result.topicId,
        usage: 0,
        trending: false,
      };
    }

    // 생성된 주제 삭제
    setGeneratedTopics((prevTopics) =>
      prevTopics.filter((t) => t.name !== topic.name)
    );

    // 주제 추가
    setTopics((prevTopics) => [...prevTopics, topicToAdd]);
  }

  return { loadings, handleAddGeneratedTopic };
}
