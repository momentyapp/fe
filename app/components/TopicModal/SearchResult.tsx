import { useContext } from "react";
import { styled, ThemeContext } from "styled-components";
import { MdTrendingUp, MdAdd, MdClose } from "react-icons/md";

import Typography from "~/components/Typography";
import Button from "~/components/Button";

import type { Topic } from "common";

const Wrapper = styled.div`
  display: flex;
  padding: 10px 15px;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  border-radius: 15px;
  width: 100%;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  overflow: hidden;
`;

const Name = styled(Typography)`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const Dot = styled.div`
  min-width: 3px;
  min-height: 3px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.grey2};
`;

const Trending = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const StyledButton = styled(Button)`
  height: 36px;
  padding: 0px 10px;
  gap: 5px;
  border-radius: 10px;
`;

interface SearchResultProps {
  topic: Topic;
}

export default function SearchResult({ topic }: SearchResultProps) {
  const theme = useContext(ThemeContext);

  return (
    <Wrapper>
      <Info>
        {/* 이름 */}
        <Name color={theme?.grey1} size="20px">
          {topic.topic}
        </Name>
        <Dot />

        {/* 인기 여부 */}
        {topic.trending && (
          <>
            <Trending>
              <MdTrendingUp size="20" color={theme?.primary2} />
              <Typography color={theme?.primary2} size="16px">
                인기
              </Typography>
            </Trending>
            <Dot />
          </>
        )}

        {/* 사용 횟수 */}
        <Typography color={theme?.grey1} size="16px">
          {topic.count?.toLocaleString() ?? 0}회
        </Typography>
      </Info>
      <div>
        {topic.enabled ? (
          <StyledButton
            backgroundColor={theme?.primary3}
            icon={<MdAdd size="20" color={theme?.bg1} />}
          >
            <Typography color={theme?.bg1} size="16px">
              추가
            </Typography>
          </StyledButton>
        ) : (
          <StyledButton
            backgroundColor={theme?.bg3}
            icon={<MdClose size="20" color={theme?.grey1} />}
          >
            <Typography color={theme?.grey1} size="16px">
              제거
            </Typography>
          </StyledButton>
        )}
      </div>
    </Wrapper>
  );
}
