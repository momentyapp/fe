import { useContext } from "react";
import { useNavigate } from "react-router";
import { styled, ThemeContext } from "styled-components";
import { MdStar } from "react-icons/md";

import Typography from "~/components/common/Typography";

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
      <MdStar size="18" color={theme?.primary3} />
      <Typography color={theme?.primary3} size="14px">
        내가 게시한 모멘트
      </Typography>
    </Wrapper>
  );
}
