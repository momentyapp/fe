import { MdArrowUpward } from "react-icons/md";
import { useTheme } from "styled-components";

import * as S from "./index.style";

interface UnseenProps {
  onClick?: () => void;
}

export default function Unseen({ onClick }: UnseenProps) {
  const theme = useTheme();

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <S.MotionWrapper
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      onClick={onClick ?? scrollToTop}
      icon={<MdArrowUpward size="20" color={theme.bg1} />}
      backgroundColor={theme.primary3}
    >
      <S.ButtonText>새 모멘트 보러 가기</S.ButtonText>
    </S.MotionWrapper>
  );
}
