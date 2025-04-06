import { useTheme } from "styled-components";

import { MdSend } from "react-icons/md";

import CommonAppBar from "~/components/common/AppBar";

import * as S from "./index.style";

interface TopProps {
  onPost: () => void;
}

export default function Top({ onPost }: TopProps) {
  const theme = useTheme();

  return (
    <CommonAppBar>
      <S.Wrapper>
        <S.PostButton
          backgroundColor={theme.primary3}
          icon={<MdSend size="20" color={theme.bg1} />}
          onClick={onPost}
        >
          <S.ButtonText color={theme.bg1}>게시하기</S.ButtonText>
        </S.PostButton>
      </S.Wrapper>
    </CommonAppBar>
  );
}
