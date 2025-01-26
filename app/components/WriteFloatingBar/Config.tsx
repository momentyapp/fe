import { useContext } from "react";
import { styled, ThemeContext } from "styled-components";
import { MdVisibility, MdAutoDelete, MdSend } from "react-icons/md";

import Button from "~/components/Button";
import Typography from "~/components/Typography";

import type { MomentConfig } from "common";

interface ConfigProps {
  config: MomentConfig;
  setConfig: React.Dispatch<React.SetStateAction<MomentConfig>>;
  onPost: () => void;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px 10px;
  padding: 20px;
  gap: 10px;
  border-radius: 15px;
  box-sizing: border-box;
  background-color: ${(props) => props.theme.bg3};
`;

const ConfigContainer = styled.div`
  display: flex;
  height: 40px;
  padding: 0px 10px;
  justify-content: space-between;
  align-items: center;
`;

const ConfigLabel = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`;

const StyledButton = styled(Button)`
  padding: 15px;
  border-radius: 15px;
`;

export default function Config({ config, setConfig, onPost }: ConfigProps) {
  const theme = useContext(ThemeContext);

  return (
    <Wrapper>
      <div>
        <ConfigContainer>
          <ConfigLabel>
            <MdVisibility size="20" color={theme?.grey1} />
            <Typography color={theme?.grey1} size="16px">
              모멘트를 익명으로 게시
            </Typography>
          </ConfigLabel>
        </ConfigContainer>
        <ConfigContainer>
          <ConfigLabel>
            <MdAutoDelete size="20" color={theme?.grey1} />
            <Typography color={theme?.grey1} size="16px">
              자동 삭제
            </Typography>
          </ConfigLabel>
        </ConfigContainer>
      </div>
      <StyledButton
        backgroundColor={theme?.primary3}
        icon={<MdSend size="20" color={theme?.bg1} />}
        onClick={onPost}
      >
        <Typography color={theme?.bg1} size="18px">
          게시하기
        </Typography>
      </StyledButton>
    </Wrapper>
  );
}
