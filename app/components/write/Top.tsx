import { useContext } from "react";
import { useNavigate } from "react-router";
import { styled, ThemeContext } from "styled-components";

import { MdNavigateBefore, MdSend } from "react-icons/md";

import Pressable from "~/components/common/Pressable";
import Button from "~/components/common/Button";
import Typography from "~/components/common/Typography";

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

interface TopProps {
  onPost: () => void;
}

export default function Top({ onPost }: TopProps) {
  const theme = useContext(ThemeContext);
  const navigate = useNavigate();

  return (
    <StyledHeader>
      {/* left */}
      <StyledPressable
        backgroundColor={theme?.bg1}
        onClick={() => navigate(-1)}
      >
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
