import Logo from "~/assets/svg/logo.svg?react";

import * as S from "./Top.style";

export default function Top() {
  return (
    <S.Wrapper>
      <Logo width="72" height="40" />
    </S.Wrapper>
  );
}
