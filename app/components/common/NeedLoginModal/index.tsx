import ReactModal from "react-modal";
import { useNavigate } from "react-router";
import { styled, useTheme } from "styled-components";
import { MdLogin } from "react-icons/md";

import Slide from "~/components/common/Slide";

import * as S from "./index.style";

interface NeedLoginModalProps extends Omit<ReactModal.Props, "style"> {
  message: string;
}

export default function NeedLoginModal({
  message,
  onRequestClose,
  isOpen,
  ...props
}: NeedLoginModalProps) {
  const navigate = useNavigate();
  const theme = useTheme();

  function handleLogin() {
    navigate("/welcome");
  }

  return (
    <ReactModal
      closeTimeoutMS={200}
      onRequestClose={onRequestClose}
      isOpen={isOpen}
      {...props}
    >
      <S.Content>
        <Slide visible={isOpen} delay={50}>
          <S.MessasgeWrapper>
            <S.Message color={theme.grey1}>{message}</S.Message>
          </S.MessasgeWrapper>
        </Slide>

        {/* 하단 버튼 */}
        <Slide visible={isOpen} delay={100}>
          <S.ActionContainer>
            <S.Action backgroundColor={theme.bg3} onClick={onRequestClose}>
              <S.ActionText color={theme.grey1}>닫기</S.ActionText>
            </S.Action>
            <S.Action
              backgroundColor={theme.primary3}
              onClick={handleLogin}
              icon={<MdLogin size="24" color={theme.bg1} />}
            >
              <S.ActionText color={theme.bg1}>로그인</S.ActionText>
            </S.Action>
          </S.ActionContainer>
        </Slide>
      </S.Content>
    </ReactModal>
  );
}
