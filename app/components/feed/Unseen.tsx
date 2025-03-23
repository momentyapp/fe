import { useContext } from "react";
import { MdArrowUpward } from "react-icons/md";
import { styled, ThemeContext } from "styled-components";

import Button from "~/components/common/Button";
import Typography from "~/components/common/Typography";

const StyledButton = styled(Button)<{ $in: boolean }>`
  padding: 10px;
  width: 180px;
  box-shadow: 0 0 3px ${(props) => props.theme?.primary3};
`;

const Wrapper = styled.div<{ $in: boolean }>`
  display: ${(props) => (props.$in ? "block" : "none")};
  padding: 5px;
  position: fixed;
  transform: translate(-50%, ${(props) => (props.$in ? "0" : "-50px")});
  left: 50%;
  top: 116px;
  display: flex;
  overflow: hidden;
  justify-content: center;
  transition: transform 0.2s ease-in-out;
`;

interface UnseenProps {
  count: number;
  onClick?: () => void;
}

export default function Unseen({ count, onClick }: UnseenProps) {
  const theme = useContext(ThemeContext);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <Wrapper $in={count > 0}>
      <StyledButton
        $in={count > 0}
        onClick={onClick ?? scrollToTop}
        icon={<MdArrowUpward size="20" color={theme?.bg1} />}
        backgroundColor={theme?.primary3}
      >
        <Typography color={theme?.bg1} size="14px">
          {count > 0
            ? `${count.toLocaleString()}개의 새 모멘트`
            : "모멘트를 모두 확인함"}
        </Typography>
      </StyledButton>
    </Wrapper>
  );
}
