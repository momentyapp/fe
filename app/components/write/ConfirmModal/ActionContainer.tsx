import { useTheme } from "styled-components";
import { MdSend } from "react-icons/md";

import CircularProgress from "~/components/common/CircularProgress";

import * as S from "./ActionContainer.style";

interface ActionContainerProps {
  loading: boolean;
  onCancel: (event: React.MouseEvent | React.KeyboardEvent) => void;
  onPost: () => void;
}

export default function ActionContainer({
  loading,
  onCancel: handleRequestClose,
  onPost,
}: ActionContainerProps) {
  const theme = useTheme();

  return (
    <S.Wrapper>
      <S.Action
        backgroundColor={loading ? theme.grey3 : theme.grey2}
        onClick={handleRequestClose}
        disabled={loading}
      >
        <S.ButtonText color={loading ? theme.grey1 : theme.bg1}>
          취소
        </S.ButtonText>
      </S.Action>

      <S.Action
        backgroundColor={loading ? theme.grey3 : theme.primary3}
        onClick={onPost}
        icon={
          loading ? (
            <CircularProgress size={24} color={theme.grey1} />
          ) : (
            <MdSend size="24" color={theme.bg1} />
          )
        }
        disabled={loading}
      >
        <S.ButtonText color={loading ? theme.grey1 : theme.bg1}>
          {loading ? "게시 중..." : "게시하기"}
        </S.ButtonText>
      </S.Action>
    </S.Wrapper>
  );
}
