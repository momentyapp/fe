import { useContext, useMemo, useState } from "react";
import { styled, ThemeContext } from "styled-components";
import { MdEdit } from "react-icons/md";
import { useNavigate } from "react-router";

import AppBar from "~/components/feed/AppBar";
import TopicList from "~/components/feed/TopicList";
import MomentList from "~/components/feed/MomentList";
import Pressable from "~/components/common/Pressable";

import useSession from "~/contexts/useSession";

import useMoments from "~/hooks/useMoments";

import useEnabledTopicsStore from "~/contexts/useEnabledTopicsStore";
import Unseen from "~/components/feed/Unseen";
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
  const theme = useContext(ThemeContext);
  const session = useSession();

  const [newMomentId, setNewMomentId] = useState<number | null>(null);

  const { enabledTopics: topics, setEnabledTopics: setTopics } =
    useEnabledTopicsStore();
  const topicIds = useMemo(() => topics.map((topic) => topic.id), [topics]);

  const { moments, isLoading, loadMore, observeMoment, unobserveMoment } =
    useMoments({
      topicIds,
      accessToken: session.accessToken?.token,
      onNewMoment: handleNewMoment,
    });

  // 새 모멘트가 게시됐을 때
  function handleNewMoment(moment: Moment) {
    if (newMomentId === null && window.scrollY > 0) setNewMomentId(moment.id);
  }

  // 모멘트가 화면에 보일 때
  function handleMomentVisible(momentId: number) {
    observeMoment(momentId);
    if (momentId === newMomentId) {
      setNewMomentId(null);
    }
  }

  // 모멘트가 화면에서 사라질 때
  function handleMomentInvisible(momentId: number) {
    unobserveMoment(momentId);
  }

  return (
    <>
      {/* 앱 바 */}
      <AppBar />

      {/* 주제 목록 */}
      <TopicList topics={topics} setTopics={setTopics} />

      <Body>
        {/* 새로운 모멘트 알림 */}
        <Unseen open={newMomentId !== null} />

        {/* 모멘트 */}
        <MomentList
          moments={moments}
          onLoadMore={loadMore}
          loading={isLoading}
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
