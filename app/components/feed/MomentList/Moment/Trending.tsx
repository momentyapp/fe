import { useTheme } from "styled-components";
import { MdTrendingUp } from "react-icons/md";

import * as S from "./Trending.style";

export default function Trending() {
  const theme = useTheme();

  return (
    <S.Wrapper>
      <MdTrendingUp size="18" color={theme.primary3} />
      <S.Text color={theme.primary3}>실시간 인기 모멘트</S.Text>
    </S.Wrapper>
  );
}
