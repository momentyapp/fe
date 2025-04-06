import { useNavigate } from "react-router";
import { useTheme } from "styled-components";

import { MdNavigateBefore } from "react-icons/md";

import * as S from "./index.style";

interface TopProps {
  onBack?: () => void;
  children?: React.ReactNode;
}

export default function AppBar({ onBack, children }: TopProps) {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <S.Wrapper>
      <S.BackButton
        backgroundColor={theme.bg1}
        onClick={onBack ?? (() => navigate(-1))}
      >
        <MdNavigateBefore size="36" color={theme.grey1} />
      </S.BackButton>

      <S.ChildrenWrapper>{children}</S.ChildrenWrapper>
    </S.Wrapper>
  );
}
