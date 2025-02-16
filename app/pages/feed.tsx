import { useContext, useEffect, useState } from "react";
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

  const postedMomentId = location.state?.postedMoment as number | undefined;

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

  // 모멘트 로드
  async function handleLoadMore() {}

  return (
    <>
      {/* 앱 바 */}
      <AppBar />

      {/* 주제 목록 */}
      <TopicToggleList topics={topics} setTopics={setTopics} />

      {/* 모멘트 */}
      <MomentList
        moments={moments}
        setMoments={setMoments}
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
