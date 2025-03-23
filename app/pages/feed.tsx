import { useContext, useEffect, useMemo, useState } from "react";
import { styled, ThemeContext } from "styled-components";
import { MdEdit } from "react-icons/md";
import { useNavigate } from "react-router";

import AppBar from "~/components/feed/AppBar";
import TopicToggleList from "~/components/feed/TopicToggleList";
import MomentList from "~/components/feed/MomentList";
import Pressable from "~/components/common/Pressable";

import useSession from "~/contexts/useSession";

import useTrendingTopics from "~/hooks/useTrendingTopics";
import useMoments from "~/hooks/useMoments";

import type { Topic } from "common";

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
  const theme = useContext(ThemeContext);
  const session = useSession();
  const trendingTopics = useTrendingTopics();

  const [topics, setTopics] = useState<Topic[]>([]);

  const enabledTopicsIds = useMemo(
    () => topics.filter((topic) => topic.enabled).map((topic) => topic.id),
    [topics]
  );

  const { moments, isLoading, loadMore, observeMoment, unobserveMoment } =
    useMoments(enabledTopicsIds, session.accessToken?.token);

  // 활성화된 주제가 없으면 트렌드 주제 가져오기
  useEffect(() => {
    if (trendingTopics === undefined) return;
    if (trendingTopics.length === 0) return;
    if (enabledTopicsIds.length > 0) return;
    setTopics(trendingTopics.map((topic) => ({ ...topic, enabled: false })));
  }, [trendingTopics]);

  // 글 쓰기 버튼 클릭 시
  function handleWrite() {
    navigate("/write");
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
        onLoadMore={loadMore}
        loading={isLoading}
        onMomentVisible={observeMoment}
        onMomentInvisible={unobserveMoment}
      />

      {/* 글 쓰기 버튼 */}
      <FloatingButton backgroundColor={theme?.primary3} onClick={handleWrite}>
        <MdEdit size="20" color={theme?.bg1} />
      </FloatingButton>
    </>
  );
}
