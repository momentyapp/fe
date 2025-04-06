import { useContext, useMemo, useState } from "react";
import { styled, ThemeContext } from "styled-components";
import { MdEdit } from "react-icons/md";
import { useNavigate } from "react-router";

import AppBar from "~/components/feed/AppBar";
import TopicList from "~/components/feed/TopicList";
import MomentContainer from "~/components/feed/MomentContainer";
import Unseen from "~/components/feed/Unseen";
import Pressable from "~/components/common/Pressable";

import useSession from "~/contexts/useSession";

import useMoments from "~/hooks/useMoments";
import useMomentFetch from "~/hooks/useMomentFetch";
import useMomentSocket from "~/hooks/useMomentSocket";

import useEnabledTopicsStore from "~/contexts/useEnabledTopicsStore";
import type { Moment } from "common";

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

const Body = styled.div`
  position: relative;
`;

export default function Feed() {
  const navigate = useNavigate();
  const session = useSession();
  const theme = useContext(ThemeContext);

  const { enabledTopics: topics, setEnabledTopics: setTopics } =
    useEnabledTopicsStore();
  const topicIds = useMemo(() => topics.map((topic) => topic.id), [topics]);

  const { moments, count, fullCount, showMoreMoments } = useMoments(topicIds);
  const { isLoading, loadMoreMoments } = useMomentFetch(
    topicIds,
    session?.accessToken?.token
  );
  const { observeMoment, unobserveMoment } = useMomentSocket(
    topicIds,
    handleNewMoment
  );

  const [unseenId, setUnseenId] = useState<number | null>(null);

  // 새 모멘트가 게시됐을 때
  function handleNewMoment(moment: Moment) {
    if (unseenId === null) setUnseenId(moment.id);
  }

  // 모멘트가 화면에 보일 때
  function handleMomentVisible(momentId: number) {
    if (momentId === unseenId) setUnseenId(null);
    observeMoment(momentId);
  }

  // 모멘트가 화면에서 사라질 때
  function handleMomentInvisible(momentId: number) {
    unobserveMoment(momentId);
  }

  // 더 많은 모멘트 불러오기
  async function handleScrollEnd() {
    if (count >= fullCount) await loadMoreMoments();
    showMoreMoments(10);
  }

  return (
    <>
      {/* 앱 바 */}
      <AppBar />

      {/* 주제 목록 */}
      <TopicList topics={topics} setTopics={setTopics} />

      <Body>
        {/* 새로운 모멘트 알림 */}
        <Unseen open={unseenId !== null} />

        {/* 모멘트 */}
        <MomentContainer
          moments={moments}
          loading={isLoading}
          onScrollEnd={handleScrollEnd}
          onMomentVisible={handleMomentVisible}
          onMomentInvisible={handleMomentInvisible}
        />
      </Body>

      {/* 글 쓰기 버튼 */}
      <FloatingButton
        backgroundColor={theme?.primary3}
        onClick={() => navigate("/write")}
      >
        <MdEdit size="20" color={theme?.bg1} />
      </FloatingButton>
    </>
  );
}
