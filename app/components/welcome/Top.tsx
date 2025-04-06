import Logo from "~/assets/svg/logo.svg?react";

import * as S from "./Top.style";
import { useTheme } from "styled-components";

export default function Top() {
  const theme = useTheme();

  return (
    <S.Wrapper>
      <Logo width="128" height="72" />
      <S.Text color={theme.primary2}>세상의 모든 트렌드를 한 순간에</S.Text>
    </S.Wrapper>
  );
}
