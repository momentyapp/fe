import { useTheme } from "styled-components";
import { MdTrendingUp, MdAdd, MdClose } from "react-icons/md";

import Dot from "~/components/common/Dot";

import * as S from "./Topic.style";

import type { Topic as TopicType } from "common";

interface TopicProps {
  topic: TopicType;
  added: boolean;
  onAdd: (topic: TopicType) => void;
  onRemove: (topic: TopicType) => void;
}

export default function Topic({ topic, added, onAdd, onRemove }: TopicProps) {
  const theme = useTheme();

  return (
    <S.Wrapper>
      <S.Info>
        {/* 이름 */}
        <S.Name color={theme.grey1}>{topic.name}</S.Name>
        <Dot color={theme.grey2} size="3px" />

        {/* 인기 여부 */}
        {topic.trending && (
          <>
            <S.Trending>
              <MdTrendingUp size="16" color={theme.primary2} />
              <S.TrendingText color={theme.primary2}>인기</S.TrendingText>
            </S.Trending>
            <Dot color={theme.grey2} size="3px" />
          </>
        )}

        {/* 사용 횟수 */}
        <S.UsageText color={theme.grey1}>
          {topic.usage?.toLocaleString() ?? 0}회
        </S.UsageText>
      </S.Info>

      {/* 추가 / 제거 버튼 */}
      <div>
        <S.AddRemoveButton
          backgroundColor={added ? theme.bg3 : theme.primary3}
          icon={
            added ? (
              <MdClose size="20" color={theme.grey2} />
            ) : (
              <MdAdd size="20" color={theme.bg1} />
            )
          }
          onClick={() => (added ? onRemove(topic) : onAdd(topic))}
        >
          <S.ButtonText color={added ? theme.grey2 : theme.bg1}>
            {added ? "제거" : "추가"}
          </S.ButtonText>
        </S.AddRemoveButton>
      </div>
    </S.Wrapper>
  );
}
