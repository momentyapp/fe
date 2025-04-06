import { useMemo } from "react";
import { useTheme } from "styled-components";
import { PhotoProvider, PhotoView } from "react-photo-view";

import Typography from "~/components/common/Typography";
import useEnabledTopicsStore from "~/contexts/useEnabledTopicsStore";

import * as S from "./Content.style";

import type { Moment, Topic } from "common";

interface ContentProps {
  moment: Moment;
  onTopicClick?: (topic: Topic) => void;
}

export default function Content({ moment, onTopicClick }: ContentProps) {
  const theme = useTheme();
  const { enabledTopics, setEnabledTopics } = useEnabledTopicsStore();

  const enabledTopicIds = useMemo(
    () => new Set(enabledTopics.map((topic) => topic.id)),
    [enabledTopics]
  );

  // 주제 클릭 시
  function handleTopicClick(topic: Topic) {
    onTopicClick?.(topic);
    setEnabledTopics((prevTopics) => {
      if (prevTopics.some((prevTopic) => prevTopic.id === topic.id))
        return prevTopics.filter((prevTopic) => prevTopic.id !== topic.id);
      else return [topic, ...prevTopics];
    });
  }

  return (
    <S.Wrapper>
      {/* 본문 */}
      <S.Body color={theme.grey1}>{moment.body.text}</S.Body>

      {/* 사진 */}
      {moment.body.photos && moment.body.photos.length > 0 && (
        <PhotoProvider speed={() => 300}>
          <S.PhotoContainer>
            {moment.body.photos.map((photo, index) => (
              <PhotoView
                key={photo}
                src={`${import.meta.env.VITE_HOST}/file/moment/${photo}`}
              >
                <S.PhotoWrapper>
                  <S.StyledImg
                    src={`${import.meta.env.VITE_HOST}/file/moment/${photo}`}
                  />
                </S.PhotoWrapper>
              </PhotoView>
            ))}
          </S.PhotoContainer>
        </PhotoProvider>
      )}

      {/* 주제 */}
      <S.TopicContainer>
        {moment.topics.map((topic) => (
          <S.Topic
            key={topic.id}
            onClick={() => handleTopicClick(topic)}
            backgroundColor={
              enabledTopicIds.has(topic.id) ? theme.primary4 : theme.bg3
            }
            $enabled={enabledTopicIds.has(topic.id)}
          >
            <S.TopicText
              color={
                enabledTopicIds.has(topic.id) ? theme.primary1 : theme.grey2
              }
            >
              {topic.name}
            </S.TopicText>
          </S.Topic>
        ))}
      </S.TopicContainer>
    </S.Wrapper>
  );
}
