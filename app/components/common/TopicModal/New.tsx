import { useMemo, useState } from "react";
import { useTheme } from "styled-components";
import { MdAddCircle } from "react-icons/md";

import API from "~/apis";

import CircularProgress from "~/components/common/CircularProgress";

import * as S from "./New.style";

interface NewProps {
  topic: string;
  onCreate: (topic: string, topicId: number) => void;
}

export default function New({ topic, onCreate }: NewProps) {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);

  const isValidName = useMemo(
    () => topic.length <= 20 && /^[가-힣\da-zA-Z]*$/g.test(topic),
    [topic]
  );

  async function handleCreate() {
    if (!isValidName) return;
    setLoading(true);

    const name = topic;
    const response = await API.topic.createTopic({ topic: name });
    const { code, message, result } = response.data;

    setLoading(false);
    if (code === "success" && result !== undefined) {
      onCreate(name, result.topicId);
    }
  }

  return (
    <S.Wrapper>
      <S.Info>
        {/* 이름 */}
        <S.Name color={isValidName ? theme.primary3 : theme.grey1}>
          {topic}
        </S.Name>
      </S.Info>

      {/* 생성 버튼 */}
      <div>
        <S.CreateButton
          icon={
            !loading ? (
              <MdAddCircle
                size="20"
                color={isValidName ? theme.bg1 : theme.grey1}
              />
            ) : (
              <CircularProgress size={20} color={theme.grey1} />
            )
          }
          onClick={handleCreate}
          disabled={!isValidName && !loading}
          backgroundColor={
            isValidName && !loading ? theme.primary3 : theme.grey3
          }
        >
          <S.ButtonText
            color={isValidName && !loading ? theme.bg1 : theme.grey1}
          >
            {loading ? "생성 중" : "새로 생성"}
          </S.ButtonText>
        </S.CreateButton>
      </div>
    </S.Wrapper>
  );
}
