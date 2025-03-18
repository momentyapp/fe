import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { styled, ThemeContext } from "styled-components";
import { MdEdit } from "react-icons/md";
import { useNavigate } from "react-router";

import AppBar from "~/components/feed/AppBar";
import TopicToggleList from "~/components/feed/TopicToggleList";
import MomentList from "~/components/feed/MomentList";
import Pressable from "~/components/common/Pressable";

import listenNewMoment from "~/hooks/listenNewMoment";

import useSession from "~/contexts/useSession";
import useMomentStore from "~/contexts/useMomentStore";
import useTopicStore from "~/contexts/useTopicStore";

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

  const theme = useContext(ThemeContext);
  const session = useSession();
  const momentStore = useMomentStore();
  const topicStore = useTopicStore();
  listenNewMoment(handleNewMoment);

  const [topics, setTopics] = useState<Topic[]>([]);
  const [moments, setMoments] = useState<MomentType[]>([]);
  const [loading, setLoading] = useState(false);

  const more = useRef(true);

  const enabledTopicsIds = useMemo(
    () => topics.filter((topic) => topic.enabled).map((topic) => topic.id),
    [topics]
  );

  // 캐시에서 실시간 트렌드 주제 가져오기
  useEffect(() => {
    const trendingTopics = topicStore.trendingTopics;
    if (trendingTopics.length === 0) return;
    setTopics(trendingTopics.map((topic) => ({ ...topic, enabled: false })));
  }, [topicStore.trendingTopics]);

  // 캐시에서 모멘트 가져오기
  useEffect(() => {
    const cachedMoments = momentStore.moments;
    let filteredMoments: MomentType[];

    if (enabledTopicsIds.length > 0) {
      filteredMoments = cachedMoments.filter((moment) =>
        moment.topics.some((topic) => enabledTopicsIds.includes(topic.id))
      );
    } else {
      filteredMoments = cachedMoments;
    }

    setMoments(filteredMoments);
  }, [momentStore.moments, enabledTopicsIds]);

  // 활성화된 주제 목록이 바뀔 시
  useEffect(() => {
    more.current = true;
    handleLoadMore(null);
  }, [enabledTopicsIds]);

  // 모멘트 더 로드
  async function handleLoadMore(before?: number | null) {
    if (loading || !more.current) return;

    setLoading(true);
    const lastMomentId =
      moments.length === 0 ? undefined : moments[moments.length - 1].id;
    const response = await API.moment.getMoments(
      {
        topicIds: topics
          .filter((topic) => topic.enabled)
          .map((topic) => topic.id),
        before: before === undefined ? lastMomentId : before ?? undefined,
      },
      session.accessToken?.token
    );
    setLoading(false);

    const { code, message, result } = response.data;

    if (code === "success" && result !== undefined) {
      const { moments: moreMoments } = result;

      momentStore.add(moreMoments);
      if (moreMoments.length < 10) {
        more.current = false;
      }
    }
  }

  // 글 쓰기 버튼 클릭 시
  function handleWrite() {
    navigate("/write");
  }

  // 새 모멘트 업데이트 시
  async function handleNewMoment({
    momentId,
    topicIds,
  }: {
    momentId: number;
    topicIds: number[];
  }) {
    if (
      topicIds.length === 0 ||
      enabledTopicsIds.length === 0 ||
      enabledTopicsIds.some((id) => topicIds.includes(id))
    ) {
      const response = await API.moment.getMomentById(
        { momentId },
        session.accessToken?.token
      );
      const { code, result } = response.data;

      if (code === "success" && result !== undefined) {
        const newMoment = result.moment;
        momentStore.add([newMoment]);
      }
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
        loading={loading}
      />

      {/* 글 쓰기 버튼 */}
      <FloatingButton backgroundColor={theme?.primary3} onClick={handleWrite}>
        <MdEdit size="20" color={theme?.bg1} />
      </FloatingButton>
    </>
  );
}
