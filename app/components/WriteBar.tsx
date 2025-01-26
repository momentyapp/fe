import { useContext } from "react";
import { useNavigate } from "react-router";
import { styled, ThemeContext } from "styled-components";

import { MdNavigateBefore, MdSend } from "react-icons/md";

import Pressable from "~/components/Pressable";
import Button from "~/components/Button";
import Typography from "~/components/Typography";

const StyledHeader = styled.header`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  background-color: ${(props) => props.theme?.bg1};
`;

const StyledPressable = styled(Pressable)`
  padding: 5px;
  border-radius: 50%;
`;

const StyledButton = styled(Button)`
  padding: 10px 15px;
  border-radius: 10px;
`;

interface WriteBarProps {
  onPost: () => void;
}

export default function WriteBar({ onPost }: WriteBarProps) {
  const theme = useContext(ThemeContext);
  const navigate = useNavigate();

  function handleBack() {
    navigate(-1);
  }

  return (
    <StyledHeader>
      {/* left */}
      <StyledPressable onClick={handleBack}>
        <MdNavigateBefore size="36" color={theme?.grey1} />
      </StyledPressable>

      {/* right */}
      <StyledButton
        backgroundColor={theme?.primary3}
        icon={<MdSend size="20" color={theme?.bg1} />}
        onClick={onPost}
      >
        <Typography color={theme?.bg1} size="18px">
          게시하기
        </Typography>
      </StyledButton>
    </StyledHeader>
  );
}
