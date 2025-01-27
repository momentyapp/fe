import { useContext } from "react";
import { styled, ThemeContext } from "styled-components";
import { MdTrendingUp } from "react-icons/md";

import Typography from "~/components/Typography";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  padding: 5px 20px;
  align-items: center;
  box-sizing: border-box;
`;

export default function Trending() {
  const theme = useContext(ThemeContext);

  return (
    <Wrapper>
      <MdTrendingUp size="24" color={theme?.primary2} />
      <Typography color={theme?.primary2} size="16px">
        실시간 인기 모멘트
      </Typography>
    </Wrapper>
  );
}
