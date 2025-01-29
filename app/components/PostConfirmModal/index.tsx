import { useContext } from "react";
import ReactModal from "react-modal";
import { styled, ThemeContext } from "styled-components";
import {
  MdAutoDelete,
  MdWarningAmber,
  MdVisibility,
  MdSend,
} from "react-icons/md";

import Button from "~/components/Button";
import Typography from "~/components/Typography";
import Slide from "~/components/Slide";

import Info from "./Info";

const Content = styled.div`
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Infos = styled.div`
  display: flex;
  padding: 10px 0;
  flex-direction: column;
  gap: 10px;
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

interface PostConfirmModalProps extends Omit<ReactModal.Props, "style"> {
  expiresIn?: number;
  anonymous: boolean;
  onPost: () => void;
  loading?: boolean;
}

export default function PostConfirmModal({
  expiresIn,
  anonymous,
  onRequestClose,
  onPost,
  loading = false,
  isOpen,
  ...props
}: PostConfirmModalProps) {
  const theme = useContext(ThemeContext);

  function handleRequestClose(event: React.MouseEvent | React.KeyboardEvent) {
    if (loading) return;
    onRequestClose?.(event);
  }

  return (
    <ReactModal
      closeTimeoutMS={200}
      onRequestClose={handleRequestClose}
      isOpen={isOpen}
      {...props}
    >
      <Content>
        {/* 제목 */}
        <Slide
          visible={isOpen}
          delay={50}
          timingFunction="cubic-bezier(0.17,0.84,0.44,1)"
        >
          <Typography color={theme?.grey1} size="24px" weight="700">
            Just a moment...
          </Typography>
        </Slide>

        {/* 상세 */}
        <Slide
          visible={isOpen}
          delay={100}
          timingFunction="cubic-bezier(0.17,0.84,0.44,1)"
        >
          <Infos>
            <Info
              icon={<MdAutoDelete size="24" color={theme?.grey1} />}
              text={
                expiresIn !== undefined
                  ? `게시 ${expiresIn}시간 후 자동 삭제`
                  : "게시 후 영구 보관"
              }
            />
            <Info
              icon={<MdWarningAmber size="24" color={theme?.grey1} />}
              text={
                anonymous ? "게시 후 수정 및 삭제 불가능" : "게시 후 삭제 가능"
              }
            />
            <Info
              icon={<MdVisibility size="24" color={theme?.grey1} />}
              text={anonymous ? "익명으로 게시" : "실명으로 게시"}
            />
          </Infos>
        </Slide>

        {/* 하단 버튼 */}
        <Slide
          visible={isOpen}
          delay={150}
          timingFunction="cubic-bezier(0.17,0.84,0.44,1)"
        >
          <Actions>
            <Action
              backgroundColor={loading ? theme?.grey3 : theme?.grey3}
              onClick={handleRequestClose}
              disabled={loading}
            >
              <Typography
                color={loading ? theme?.grey1 : theme?.bg1}
                size="18px"
              >
                취소
              </Typography>
            </Action>
            <Action
              backgroundColor={loading ? theme?.grey3 : theme?.primary3}
              onClick={onPost}
              icon={
                <MdSend size="24" color={loading ? theme?.grey1 : theme?.bg1} />
              }
              disabled={loading}
            >
              <Typography
                color={loading ? theme?.grey1 : theme?.bg1}
                size="18px"
              >
                {loading ? "게시 중..." : "게시하기"}
              </Typography>
            </Action>
          </Actions>
        </Slide>
      </Content>
    </ReactModal>
  );
}
