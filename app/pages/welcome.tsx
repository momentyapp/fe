import { useContext } from "react";
import { useNavigate } from "react-router";
import { styled, ThemeContext } from "styled-components";
import { MdPersonAdd } from "react-icons/md";

import Logo from "~/assets/svg/logo.svg?react";

import Typography from "~/components/common/Typography";
import Pressable from "~/components/common/Pressable";
import Button from "~/components/common/Button";

const Top = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  gap: 40px;
  min-height: 200px;
  height: calc(100vh - 500px);
`;

const Bottom = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  padding: 20px;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  background-color: ${(props) => props.theme.bg1};
`;

const ButtonList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

const StyledButton = styled(Button)`
  width: 100%;
`;

const AnchorWrapper = styled(Pressable)`
  padding: 5px 10px;
  border-radius: 5px;
`;

const Anchor = styled(Typography)`
  text-decoration-line: underline;
`;

export default function Welcome() {
  const theme = useContext(ThemeContext);
  const navigate = useNavigate();

  function handleNotNow() {
    navigate("/");
  }

  return (
    <>
      <Top>
        <Logo width="128" height="72" />
        <Typography color={theme?.primary2} size="18px">
          세상의 모든 트렌드를 한 순간에
        </Typography>
      </Top>

      <Bottom>
        <AnchorWrapper backgroundColor={theme?.bg1}>
          <Anchor color={theme?.grey2} size="16px">
            이미 계정이 있어요.
          </Anchor>
        </AnchorWrapper>

        <ButtonList>
          <StyledButton
            backgroundColor={theme?.primary3}
            icon={<MdPersonAdd size="24" color={theme?.bg1} />}
          >
            <Typography color={theme?.bg1} size="18px">
              10초 만에 회원가입하기
            </Typography>
          </StyledButton>
          <StyledButton onClick={handleNotNow} backgroundColor={theme?.bg3}>
            <Typography color={theme?.grey1} size="18px">
              건너뛰기
            </Typography>
          </StyledButton>
        </ButtonList>
      </Bottom>
    </>
  );
}
