import { useTheme } from "styled-components";
import { useNavigate } from "react-router";
import { MdPersonAdd } from "react-icons/md";

import * as S from "./Bottom.style";

export default function Bottom() {
  const theme = useTheme();
  const navigate = useNavigate();

  function handleNotNow() {
    navigate("/");
  }

  function handleLogin() {
    navigate("/login");
  }

  function handleSignUp() {
    navigate("/signup");
  }

  return (
    <S.Wrapper>
      <S.AnchorWrapper onClick={handleLogin} backgroundColor={theme.bg1}>
        <S.Anchor color={theme.grey2}>이미 계정이 있나요?</S.Anchor>
      </S.AnchorWrapper>

      <S.ButtonList>
        <S.FullWidthButton
          onClick={handleSignUp}
          backgroundColor={theme.primary3}
          icon={<MdPersonAdd size="24" color={theme.bg1} />}
        >
          <S.ButtonText color={theme.bg1}>10초 만에 회원가입하기</S.ButtonText>
        </S.FullWidthButton>

        <S.FullWidthButton onClick={handleNotNow} backgroundColor={theme.bg3}>
          <S.ButtonText color={theme.grey1}>건너뛰기</S.ButtonText>
        </S.FullWidthButton>
      </S.ButtonList>
    </S.Wrapper>
  );
}
