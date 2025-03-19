import { useRef, useState } from "react";

import type { Topic } from "common";
import API from "~/apis";

export default function useTopicSearch(
  addedTopics: Topic[],
  setAddedTopics: React.Dispatch<React.SetStateAction<Topic[]>>
) {
  const lastTimeout = useRef<NodeJS.Timeout>(null);
  const abortController = useRef<AbortController>(new AbortController());

  const [searchValue, setSearchValue] = useState("");
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(false);

  // 검색어 변경 디바운싱
  async function handleChangeSearchValue(value: string) {
    abortController.current.abort();
    abortController.current = new AbortController();
    setLoading(false);

    const replaced = value.replaceAll(" ", "");
    setSearchValue(replaced);

    if (lastTimeout.current !== null) clearTimeout(lastTimeout.current);

    // 200ms 이후
    lastTimeout.current = setTimeout(async () => {
      if (replaced.length === 0 || !/^[가-힣\da-zA-Z]*$/g.test(replaced)) {
        setTopics([]);
        return;
      }

      // 문자열 검색
      async function searchByString() {
        const filteredTopics = await API.topic.searchTopic(
          { query: replaced },
          abortController.current.signal
        );
        const { code, message, result } = filteredTopics.data;

        if (code === "success" && result !== undefined) {
          setTopics(
            result.topics.map((topic) => ({
              id: topic.id,
              name: topic.name,
              trending: topic.trending,
              count: topic.usage,
              enabled: addedTopics.some(
                (addedTopic) => addedTopic.id === topic.id
              ),
            }))
          );
        }
      }

      setLoading(true);
      try {
        await searchByString();
      } catch (e) {
        if (!(e instanceof Error && e.name === "AggregateError")) throw e;
      }
      setLoading(false);
    }, 200);
  }

  // 주제 생성 함수
  function handleCreate(topic: string, topicId: number) {
    const newTopic = {
      name: topic,
      id: topicId,
      enabled: true,
      trending: false,
      usage: 0,
    };

    setAddedTopics((prevTopics) => [newTopic, ...prevTopics]);
    setTopics((prevTopics) => [newTopic, ...prevTopics]);
  }

  return {
    searchValue,
    handleChangeSearchValue,
    topics,
    loading,
    handleCreate,
  };
}
