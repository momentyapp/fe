import { useContext, useEffect, useState } from "react";
import { styled, ThemeContext } from "styled-components";
import { MdEdit } from "react-icons/md";
import { useLocation, useNavigate } from "react-router";

import AppBar from "~/components/AppBar";
import TopicFilter from "~/components/TopicFilter";
import MomentList from "~/components/MomentList";
import Pressable from "~/components/Pressable";
import CacheContext from "~/contexts/cache";

import type { Moment as MomentType, Topic } from "common";
import API from "~/apis";

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

  const postedMoment = location.state?.postedMoment as MomentType | undefined;

  // 캐시에서 실시간 트렌드 주제 가져오기
  useEffect(() => {
    const trendingTopics = cache.trendingTopics;
    if (trendingTopics.length === 0) return;
    setTopics(trendingTopics.map((topic) => ({ ...topic, enabled: false })));
  }, [cache.trendingTopics]);

  // 글 작성 후 새로운 모멘트 추가
  useEffect(() => {
    if (postedMoment === undefined) return;
    setMoments((moments) => {
      if (moments.some((moment) => moment.id === postedMoment.id))
        return moments;
      return [postedMoment, ...moments];
    });
  }, [moments, postedMoment]);

  // 모멘트 처음 로드
  useEffect(() => {
    setMoments([]);
    handleLoadMore();
  }, [topics]);

  // 글 쓰기 버튼 클릭 시
  function handleWrite() {
    navigate("/write");
  }

  // 모멘트 로드
  async function handleLoadMore() {
    let before: number | undefined = undefined;
    if (moments.length > 0) before = moments[moments.length - 1].id;

    const newMoments = await API.moment.getMoments({
      before,
      topicIds: topics.map((topic) => topic.id),
    });
    const { code, message, result } = newMoments.data;

    if (code === "success" && result !== undefined) {
      setMoments((prev) => [...prev, ...result.moments]);
    }
  }

  return (
    <>
      {/* 앱 바 */}
      <AppBar />

      {/* 주제 목록 */}
      <TopicFilter topics={topics} setTopics={setTopics} />

      {/* 모멘트 */}
      <MomentList
        moments={moments}
        setMoments={setMoments}
        onLoadMore={handleLoadMore}
        my={postedMoment?.id}
      />

      {/* 글 쓰기 버튼 */}
      <FloatingButton backgroundColor={theme?.primary3} onClick={handleWrite}>
        <MdEdit size="20" color={theme?.bg1} />
      </FloatingButton>
    </>
  );
}
