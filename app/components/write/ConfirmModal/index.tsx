import ReactModal from "react-modal";
import { useTheme } from "styled-components";
import { MdAutoDelete, MdWarningAmber, MdVisibility } from "react-icons/md";

import Slide from "~/components/common/Slide";

import ActionContainer from "./ActionContainer";

import * as S from "./index.style";

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
  const theme = useTheme();

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
      <S.Content>
        {/* 제목 */}
        <Slide visible={isOpen} delay={50}>
          <S.Title color={theme.grey1}>Just a moment...</S.Title>
        </Slide>

        {/* 상세 */}
        <Slide visible={isOpen} delay={100}>
          <S.InfoContainer>
            <S.Info>
              <MdAutoDelete size="24" color={theme.grey1} />
              <S.InfoText color={theme.grey1}>
                {expiresIn !== undefined
                  ? `게시 ${expiresIn}시간 후 자동 삭제`
                  : "게시 후 영구 보관"}
              </S.InfoText>
            </S.Info>

            <S.Info>
              <MdWarningAmber size="24" color={theme.grey1} />
              <S.InfoText color={theme.grey1}>
                {anonymous
                  ? "게시 후 수정 및 삭제 불가능"
                  : "게시 후 삭제 가능"}
              </S.InfoText>
            </S.Info>

            <S.Info>
              <MdVisibility size="24" color={theme.grey1} />
              <S.InfoText color={theme.grey1}>
                {anonymous ? "익명으로 게시" : "실명으로 게시"}
              </S.InfoText>
            </S.Info>
          </S.InfoContainer>
        </Slide>

        {/* 하단 버튼 */}
        <Slide visible={isOpen} delay={150}>
          <ActionContainer
            loading={loading}
            onCancel={handleRequestClose}
            onPost={onPost}
          />
        </Slide>
      </S.Content>
    </ReactModal>
  );
}
