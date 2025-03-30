import { useContext, useMemo } from "react";
import { styled, ThemeContext } from "styled-components";
import { PhotoProvider, PhotoView } from "react-photo-view";

import Typography from "~/components/common/Typography";
import Pressable from "~/components/common/Pressable";

import useEnabledTopicsStore from "~/contexts/useEnabledTopicsStore";

import type { Moment, Topic } from "common";
import Button from "~/components/common/Button";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  width: 100%;
  overflow-x: hidden;
`;

const StyledTypography = styled(Typography)`
  padding: 0px 15px 0px 30px;
  line-height: 1.5;
  white-space: pre-wrap;
`;

const PhotoContainer = styled.div`
  display: flex;
  height: 160px;
  padding: 10px 30px;
  box-sizing: border-box;
  align-items: center;
  gap: 10px;
  overflow-x: auto;
  width: 100%;
`;

const PhotoWrapper = styled(Pressable)`
  height: 100%;
  border-radius: 10px;
  padding: 0;
  overflow: hidden;
`;

const StyledImg = styled.img`
  max-height: 100%;
  object-fit: cover;
  border-radius: 10px;
`;

const TopicContainer = styled.div`
  display: flex;
  gap: 10px;
  box-sizing: border-box;
  overflow-x: auto;
  padding: 5px 30px;
  width: 100%;
  border-radius: 10px;
  scrollbar-width: none;
`;

const Topic = styled(Button)<{ $enabled: boolean }>`
  flex-shrink: 0;
  display: flex;
  padding: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  border: 1px solid
    ${(props) => (props.$enabled ? props.theme.primary4 : props.theme.grey3)};
  transition: background-color 0.2s, border 0.2s, background 0.2s, filter 0.2s,
    transform 0.1s ease-in-out;
`;

interface ContentProps {
  moment: Moment;
  onTopicClick?: (topic: Topic) => void;
}

export default function Content({ moment, onTopicClick }: ContentProps) {
  const theme = useContext(ThemeContext);
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
    <Wrapper>
      {/* 본문 */}
      <StyledTypography color={theme?.grey1} size="16px">
        {moment.body.text}
      </StyledTypography>

      {/* 사진 */}
      {moment.body.photos && moment.body.photos.length > 0 && (
        <PhotoProvider speed={() => 300}>
          <PhotoContainer>
            {moment.body.photos.map((photo, index) => (
              <PhotoView
                key={photo}
                src={`${import.meta.env.VITE_HOST}/file/moment/${photo}`}
              >
                <PhotoWrapper>
                  <StyledImg
                    src={`${import.meta.env.VITE_HOST}/file/moment/${photo}`}
                  />
                </PhotoWrapper>
              </PhotoView>
            ))}
          </PhotoContainer>
        </PhotoProvider>
      )}

      {/* 주제 */}
      <TopicContainer>
        {moment.topics.map((topic) => (
          <Topic
            key={topic.id}
            onClick={() => handleTopicClick(topic)}
            backgroundColor={
              enabledTopicIds.has(topic.id) ? theme?.primary4 : theme?.bg3
            }
            $enabled={enabledTopicIds.has(topic.id)}
          >
            <Typography
              color={
                enabledTopicIds.has(topic.id) ? theme?.primary1 : theme?.grey2
              }
              size="14px"
            >
              {topic.name}
            </Typography>
          </Topic>
        ))}
      </TopicContainer>
    </Wrapper>
  );
}
