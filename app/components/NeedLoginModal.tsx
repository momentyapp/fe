import { useContext } from "react";
import ReactModal from "react-modal";
import { useNavigate } from "react-router";
import { styled, ThemeContext } from "styled-components";
import {  MdLogin } from "react-icons/md";

import Button from "~/components/Button";
import Typography from "~/components/Typography";
import Slide from "~/components/Slide";

const Content = styled.div`
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StyledDiv = styled.div`
  padding-bottom: 20px;
`;

const Actions = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  gap: 5px;
`;

const Action = styled(Button)`
  width: 100%;
`;

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
  const theme = useContext(ThemeContext);

  function handleLogin() {
    navigate("/login");
  }

  return (
    <ReactModal
      closeTimeoutMS={200}
      onRequestClose={onRequestClose}
      isOpen={isOpen}
      {...props}
    >
      <Content>
        <Slide
          visible={isOpen}
          delay={50}
          timingFunction="cubic-bezier(0.17,0.84,0.44,1)"
        >
          <StyledDiv>
            <Typography size="18px" color={theme?.grey1}>
              {message}
            </Typography>
          </StyledDiv>
        </Slide>

        {/* 하단 버튼 */}
        <Slide
          visible={isOpen}
          delay={100}
          timingFunction="cubic-bezier(0.17,0.84,0.44,1)"
        >
          <Actions>
            <Action backgroundColor={theme?.bg3} onClick={onRequestClose}>
              <Typography color={theme?.grey1} size="18px">
                닫기
              </Typography>
            </Action>
            <Action
              backgroundColor={theme?.primary3}
              onClick={handleLogin}
              icon={<MdLogin size="24" color={theme?.bg1} />}
            >
              <Typography color={theme?.bg1} size="18px">
                로그인
              </Typography>
            </Action>
          </Actions>
        </Slide>
      </Content>
    </ReactModal>
  );
}
