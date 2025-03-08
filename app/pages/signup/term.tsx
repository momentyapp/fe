import { useContext } from "react";
import { MdNavigateNext } from "react-icons/md";
import { styled, ThemeContext } from "styled-components";

import Button from "~/components/common/Button";
import Typography from "~/components/common/Typography";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

const StyledButton = styled(Button)`
  width: 100%;
  justify-content: space-between;
`;

export default function Term() {
  const theme = useContext(ThemeContext);

  return (
    <Wrapper>
      <StyledButton
        backgroundColor={theme?.bg3}
        icon={<MdNavigateNext size="24" color={theme?.grey1} />}
        iconPosition="right"
      >
        <Typography color={theme?.grey1} size="18px">
          서비스 이용 약관
        </Typography>
      </StyledButton>
      <StyledButton
        backgroundColor={theme?.bg3}
        icon={<MdNavigateNext size="24" color={theme?.grey1} />}
        iconPosition="right"
      >
        <Typography color={theme?.grey1} size="18px">
          개인정보 처리 방침
        </Typography>
      </StyledButton>
    </Wrapper>
  );
}
