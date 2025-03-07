import { useContext } from "react";
import { useNavigate } from "react-router";
import { styled, ThemeContext } from "styled-components";

import { MdNavigateBefore } from "react-icons/md";

import Pressable from "~/components/common/Pressable";

const StyledHeader = styled.header`
  display: flex;
  padding: 20px;
  justify-content: flex-start;
  align-items: center;
  position: sticky;
  top: 0;
  background-color: ${(props) => props.theme?.bg1};
`;

const StyledPressable = styled(Pressable)`
  padding: 5px;
  border-radius: 50%;
`;

interface TopProps {
  onBack?: () => void;
}

export default function Top({ onBack }: TopProps) {
  const theme = useContext(ThemeContext);
  const navigate = useNavigate();

  return (
    <StyledHeader>
      <StyledPressable
        backgroundColor={theme?.bg1}
        onClick={onBack ?? (() => navigate(-1))}
      >
        <MdNavigateBefore size="36" color={theme?.grey1} />
      </StyledPressable>
    </StyledHeader>
  );
}
