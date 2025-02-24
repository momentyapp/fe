import { useContext, useEffect, useRef, useState } from "react";
import { styled, ThemeContext } from "styled-components";
import { MdEdit } from "react-icons/md";
import { useLocation, useNavigate } from "react-router";

import AppBar from "~/components/feed/AppBar";
import TopicToggleList from "~/components/feed/TopicToggleList";
import MomentList from "~/components/feed/MomentList";
import Pressable from "~/components/common/Pressable";

import CacheContext from "~/contexts/cache";
import API from "~/apis";

import type { Moment as MomentType, Topic } from "common";

const FloatingButton = styled(Pressable)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 20px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Feed() {
  const navigate = useNavigate();
  const location = useLocation();

  const theme = useContext(ThemeContext);
  const cache = useContext(CacheContext);

  const [topics, setTopics] = useState<Topic[]>([]);
  const [moments, setMoments] = useState<MomentType[]>([]);
  const [loading, setLoading] = useState(false);

  const more = useRef(true);

  const postedMomentId = location.state?.postedMoment as number | undefined;

  // 최초 모멘트 가져오기
  useEffect(() => {
    const abortController = new AbortController();
    handleLoadMore(abortController.signal);

    return () => abortController.abort();
  }, []);

  // 캐시에서 실시간 트렌드 주제 가져오기
  useEffect(() => {
    const trendingTopics = cache.trendingTopics;
    if (trendingTopics.length === 0) return;
    setTopics(trendingTopics.map((topic) => ({ ...topic, enabled: false })));
  }, [cache.trendingTopics]);

  // 캐시에서 모멘트 가져오기
  useEffect(() => {
    const cachedMoments = cache.moments;
    const enabledTopicsIds = topics
      .filter((topic) => topic.enabled)
      .map((topic) => topic.id);
    let filteredMoments: MomentType[];

    if (enabledTopicsIds.length > 0) {
      filteredMoments = cachedMoments.filter((moment) =>
        moment.topics.some((topic) => enabledTopicsIds.includes(topic.id))
      );
    } else {
      filteredMoments = cachedMoments;
    }

    setMoments(filteredMoments);
  }, [cache.moments, topics]);

  // 글 쓰기 버튼 클릭 시
  function handleWrite() {
    navigate("/write");
  }

  // 모멘트 더 로드
  async function handleLoadMore(signal?: AbortSignal) {
    if (!more.current || loading) return;

    try {
      setLoading(true);
      const response = await API.moment.getMoments(
        {
          topicIds: topics
            .filter((topic) => topic.enabled)
            .map((topic) => topic.id),
          before:
            moments.length > 0 ? moments[moments.length - 1].id : undefined,
        },
        signal
      );
      setLoading(false);

      const { code, message, result } = response.data;

      if (code === "success" && result !== undefined) {
        const { moments: moreMoments } = result;

        cache.addMoments(moreMoments);
        if (moreMoments.length < 10) more.current = false;
      }
    } catch (e) {
      if (e instanceof Error && e.name === "CanceledError") return;
      throw e;
    }
  }

  return (
    <>
      {/* 앱 바 */}
      <AppBar />

      {/* 주제 목록 */}
      <TopicToggleList topics={topics} setTopics={setTopics} />

      {/* 모멘트 */}
      <MomentList
        moments={moments}
        onLoadMore={handleLoadMore}
        my={postedMomentId}
      />

      {/* 글 쓰기 버튼 */}
      <FloatingButton backgroundColor={theme?.primary3} onClick={handleWrite}>
        <MdEdit size="20" color={theme?.bg1} />
      </FloatingButton>
    </>
  );
}
