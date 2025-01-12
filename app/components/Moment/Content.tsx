import { useContext } from "react";
import { styled, ThemeContext } from "styled-components";

import Typography from "~/components/Typography";

import type { Moment } from "common";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
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

const StyledImg = styled.img`
  width: 100%;
  max-height: 100%;
  object-fit: cover;
  border-radius: 10px;
`;

const TopicContainer = styled.div`
  display: flex;
  gap: 10px;
  box-sizing: border-box;
  overflow-x: auto;
  padding: 0px 30px;
  width: 100%;
  border-radius: 10px;
`;

const Topic = styled.div`
  display: flex;
  height: 36px;
  padding: 0px 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background: ${(props) => props.theme.bg1};
`;

interface ContentProps {
  moment: Moment;
}

export default function Content({ moment }: ContentProps) {
  const theme = useContext(ThemeContext);
  return (
    <Wrapper>
      {/* 본문 */}
      <StyledTypography color={theme?.grey1} size="16">
        {moment.body.text}
      </StyledTypography>

      {/* 사진 */}
      {moment.body.photos && (
        <PhotoContainer>
          {moment.body.photos.map((photo, index) => (
            <StyledImg key={index} src={photo} />
          ))}
        </PhotoContainer>
      )}

      {/* 주제 */}
      <TopicContainer>
        {moment.topics.map((topic, index) => (
          <Topic key={index}>
            <Typography color={theme?.grey1} size="14px">
              {topic.topic}
            </Typography>
          </Topic>
        ))}
      </TopicContainer>
    </Wrapper>
  );
}