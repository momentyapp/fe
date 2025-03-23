import { useContext, useEffect, useMemo, useState } from "react";
import { styled, ThemeContext } from "styled-components";
import { MdEdit } from "react-icons/md";
import { useNavigate } from "react-router";

import AppBar from "~/components/feed/AppBar";
import TopicList from "~/components/feed/TopicList";
import MomentList from "~/components/feed/MomentList";
import Pressable from "~/components/common/Pressable";

import useSession from "~/contexts/useSession";

import useMoments from "~/hooks/useMoments";

import type { Topic } from "common";
import useEnabledTopicsStore from "~/contexts/useEnabledTopicsStore";

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

  const { enabledTopics: topics, setEnabledTopics: setTopics } =
    useEnabledTopicsStore();
  const topicIds = useMemo(() => topics.map((topic) => topic.id), [topics]);

  const { moments, isLoading, loadMore, observeMoment, unobserveMoment } =
    useMoments(topicIds, session.accessToken?.token);

  // 글 쓰기 버튼 클릭 시
  function handleWrite() {
    navigate("/write");
  }

  return (
    <>
      {/* 앱 바 */}
      <AppBar />

      {/* 주제 목록 */}
      <TopicList topics={topics} setTopics={setTopics} />

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
