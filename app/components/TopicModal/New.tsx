import { useContext, useState } from "react";
import { styled, ThemeContext } from "styled-components";
import { MdAddCircle } from "react-icons/md";

import Typography from "~/components/Typography";
import Button from "~/components/Button";
import API from "~/apis";

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

const StyledButton = styled(Button)`
  height: 36px;
  padding: 0px 10px;
  gap: 5px;
  border-radius: 10px;
`;

interface NewProps {
  topic: string;
  onCreate: (topic: string, topicId: number) => void;
}

export default function New({ topic, onCreate }: NewProps) {
  const theme = useContext(ThemeContext);
  const [loading, setLoading] = useState(false);
  const isValidName = topic.length <= 20 && /^[가-힣\da-zA-Z]*$/g.test(topic);

  async function handleCreate() {
    if (!isValidName) return;
    setLoading(true);

    const name = topic;
    const response = await API.topic.createTopic({ topic: name });
    const { code, message, result } = response.data;

    if (code === "success" && result !== undefined) {
      onCreate(name, result.topicId);
    }

    setLoading(false);
  }

  return (
    <Wrapper>
      <Info>
        {/* 이름 */}
        <StyledTypography
          color={isValidName ? theme?.primary3 : theme?.grey1}
          size="18px"
        >
          {topic}
        </StyledTypography>
      </Info>

      {/* 생성 버튼 */}
      <div>
        <StyledButton
          backgroundColor={
            isValidName && !loading ? theme?.primary3 : theme?.grey3
          }
          icon={
            <MdAddCircle
              size="20"
              color={isValidName && !loading ? theme?.bg1 : theme?.grey1}
            />
          }
          disabled={!isValidName && !loading}
          onClick={handleCreate}
        >
          <StyledTypography
            color={isValidName && !loading ? theme?.bg1 : theme?.grey1}
            size="16px"
          >
            {loading ? "생성 중" : "새로 생성"}
          </StyledTypography>
        </StyledButton>
      </div>
    </Wrapper>
  );
}
