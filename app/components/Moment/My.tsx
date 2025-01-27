import { useContext } from "react";
import { styled, ThemeContext } from "styled-components";
import { MdStar } from "react-icons/md";

import Typography from "~/components/Typography";
import { useNavigate } from "react-router";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  padding: 5px 20px;
  align-items: center;
  box-sizing: border-box;
`;

export default function My() {
  const theme = useContext(ThemeContext);
  const navigate = useNavigate();

  return (
    <Wrapper>
      <MdStar size="24" color={theme?.primary2} />
      <Typography color={theme?.primary2} size="16px">
        내가 게시한 모멘트
      </Typography>
    </Wrapper>
  );
}
