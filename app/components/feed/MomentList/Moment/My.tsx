import { useTheme } from "styled-components";
import { MdStar } from "react-icons/md";

import * as S from "./My.style";

export default function My() {
  const theme = useTheme();

  return (
    <S.Wrapper>
      <MdStar size="18" color={theme.primary3} />
      <S.Text color={theme.primary3}>내가 게시한 모멘트</S.Text>
    </S.Wrapper>
  );
}
