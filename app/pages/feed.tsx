import { useContext, useEffect, useState } from "react";
import { styled, ThemeContext } from "styled-components";
import { MdEdit } from "react-icons/md";
import { useLocation, useNavigate } from "react-router";

import AppBar from "~/components/AppBar";
import TopicFilter from "~/components/TopicFilter";
import MomentContainer from "~/components/MomentContainer";
import Pressable from "~/components/Pressable";

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

  const [topics, setTopics] = useState<Topic[]>([]);
  const [moments, setMoments] = useState<MomentType[]>([]);

  useEffect(() => {
    (async () => {
      const trendingTopics = await API.topic.getTrendingTopics();
      const { code, message, result } = trendingTopics.data;

      if (code === "success" && result !== undefined) {
        setTopics(
          result.topics.map((topic) => ({
            id: topic.id,
            topic: topic.name,
            trending: topic.trending,
            count: topic.usage,
          }))
        );
      }
    })();
  }, []);

  function handleWrite() {
    navigate("/write");
  }

  const postedMoment = location.state?.postedMoment as MomentType | undefined;

  useEffect(() => {
    if (postedMoment === undefined) return;
    setMoments((moments) => {
      if (moments.some((moment) => moment.id === postedMoment.id))
        return moments;
      return [postedMoment, ...moments];
    });
  }, [moments, postedMoment]);

  return (
    <>
      {/* 앱 바 */}
      <AppBar />

      {/* 주제 목록 */}
      <TopicFilter topics={topics} setTopics={setTopics} />

      {/* 모멘트 */}
      <MomentContainer
        moments={moments}
        setMoments={setMoments}
        my={postedMoment?.id}
      />

      {/* 글 쓰기 버튼 */}
      <FloatingButton backgroundColor={theme?.primary3} onClick={handleWrite}>
        <MdEdit size="20" color={theme?.bg1} />
      </FloatingButton>
    </>
  );
}
