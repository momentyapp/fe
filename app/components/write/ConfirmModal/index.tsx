import { useContext } from "react";
import ReactModal from "react-modal";
import { styled, ThemeContext } from "styled-components";
import { MdAutoDelete, MdWarningAmber, MdVisibility } from "react-icons/md";

import Typography from "~/components/common/Typography";
import Slide from "~/components/common/Slide";

import Info from "./Info";
import ActionList from "./ActionList";

const Content = styled.div`
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const InfoList = styled.div`
  display: flex;
  padding: 10px 0;
  flex-direction: column;
  gap: 10px;
`;

interface ConfirmModalProps extends Omit<ReactModal.Props, "style"> {
  expiresIn?: number;
  anonymous: boolean;
  onPost: () => void;
  loading?: boolean;
}

export default function ConfirmModal({
  expiresIn,
  anonymous,
  onRequestClose,
  onPost,
  loading = false,
  isOpen,
  ...props
}: ConfirmModalProps) {
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
          <InfoList>
            <Info icon={<MdAutoDelete size="24" color={theme?.grey1} />}>
              {expiresIn !== undefined
                ? `게시 ${expiresIn}시간 후 자동 삭제`
                : "게시 후 영구 보관"}
            </Info>
            <Info icon={<MdWarningAmber size="24" color={theme?.grey1} />}>
              {anonymous ? "게시 후 수정 및 삭제 불가능" : "게시 후 삭제 가능"}
            </Info>

            <Info icon={<MdVisibility size="24" color={theme?.grey1} />}>
              {anonymous ? "익명으로 게시" : "실명으로 게시"}
            </Info>
          </InfoList>
        </Slide>

        {/* 하단 버튼 */}
        <Slide
          visible={isOpen}
          delay={150}
          timingFunction="cubic-bezier(0.17,0.84,0.44,1)"
        >
          <ActionList
            loading={loading}
            onCancel={handleRequestClose}
            onPost={onPost}
          />
        </Slide>
      </Content>
    </ReactModal>
  );
}
