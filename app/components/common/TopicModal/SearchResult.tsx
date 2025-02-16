import { useContext } from "react";
import { styled, ThemeContext } from "styled-components";
import { MdTrendingUp, MdAdd, MdClose } from "react-icons/md";

import Typography from "~/components/common/Typography";
import Button from "~/components/common/Button";
import Dot from "~/components/common/Dot";

import type { Topic } from "common";

const Wrapper = styled.div`
  display: flex;
  padding: 5px 10px;
  gap: 10px;
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
  width: 100%;
  height: 100%;
  overflow-x: auto;
`;

const StyledTypography = styled(Typography)`
  white-space: nowrap;
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
  added: boolean;
  onAdd: (topic: Topic) => void;
  onRemove: (topic: Topic) => void;
}

export default function SearchResult({
  topic,
  added,
  onAdd,
  onRemove,
}: SearchResultProps) {
  const theme = useContext(ThemeContext);

  return (
    <Wrapper>
      <Info>
        {/* 이름 */}
        <StyledTypography color={theme?.grey1} size="18px">
          {topic.name}
        </StyledTypography>
        <Dot color={theme?.grey2} size="3px" />

        {/* 인기 여부 */}
        {topic.trending && (
          <>
            <Trending>
              <MdTrendingUp size="16" color={theme?.primary2} />
              <StyledTypography color={theme?.primary2} size="14px">
                인기
              </StyledTypography>
            </Trending>
            <Dot color={theme?.grey2} size="3px" />
          </>
        )}

        {/* 사용 횟수 */}
        <StyledTypography color={theme?.grey1} size="14px">
          {topic.usage?.toLocaleString() ?? 0}회
        </StyledTypography>
      </Info>

      {/* 추가 / 제거 버튼 */}
      <div>
        {!added ? (
          <StyledButton
            backgroundColor={theme?.primary3}
            icon={<MdAdd size="20" color={theme?.bg1} />}
            onClick={() => onAdd(topic)}
          >
            <StyledTypography color={theme?.bg1} size="16px">
              추가
            </StyledTypography>
          </StyledButton>
        ) : (
          <StyledButton
            backgroundColor={theme?.bg3}
            icon={<MdClose size="20" color={theme?.grey1} />}
            onClick={() => onRemove(topic)}
          >
            <StyledTypography color={theme?.grey1} size="16px">
              제거
            </StyledTypography>
          </StyledButton>
        )}
      </div>
    </Wrapper>
  );
}
