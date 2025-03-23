import { useContext } from "react";
import { styled, ThemeContext } from "styled-components";
import { PhotoProvider, PhotoView } from "react-photo-view";

import Typography from "~/components/common/Typography";
import Pressable from "~/components/common/Pressable";

import type { Moment } from "common";

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
  padding: 0 30px;
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
`;

const Topic = styled.div`
  flex-shrink: 0;
  display: flex;
  padding: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  border: 1px solid ${(props) => props.theme.bg2};
`;

interface ContentProps {
  moment: Moment;
}

export default function Content({ moment }: ContentProps) {
  const theme = useContext(ThemeContext);

  return (
    <Wrapper>
      {/* 본문 */}
      <StyledTypography color={theme?.grey1} size="16px">
        {moment.body.text}
      </StyledTypography>

      {/* 사진 */}
      {moment.body.photos && moment.body.photos.length > 0 && (
        <PhotoProvider
          speed={() => 300}
          easing={() => "cubic-bezier(0.175, 0.885, 0.32, 1.275)"}
        >
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
          <Topic key={topic.id}>
            <Typography color={theme?.grey2} size="14px">
              {topic.name}
            </Typography>
          </Topic>
        ))}
      </TopicContainer>
    </Wrapper>
  );
}
