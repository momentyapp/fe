import { useTheme } from "styled-components";
import { useNavigate } from "react-router";
import { MdLogin } from "react-icons/md";

import * as S from "./Bottom.style";

interface BottomProps {
  onSubmit: () => void;
}

export default function Bottom({ onSubmit }: BottomProps) {
  const theme = useTheme();
  const navigate = useNavigate();

  function handleSignUp() {
    navigate("/signup");
  }

  return (
    <S.Wrapper>
      <S.AnchorWrapper onClick={handleSignUp} backgroundColor={theme.bg1}>
        <S.Anchor color={theme.grey2}>계정이 없으신가요?</S.Anchor>
      </S.AnchorWrapper>

      <S.ButtonList>
        <S.FullWidthButton
          type="submit"
          form="login_form"
          backgroundColor={theme.primary3}
          icon={<MdLogin size="24" color={theme.bg1} />}
        >
          <S.ButtonText color={theme.bg1}>로그인</S.ButtonText>
        </S.FullWidthButton>
      </S.ButtonList>
    </S.Wrapper>
  );
}
