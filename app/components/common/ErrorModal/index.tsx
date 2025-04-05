import { useState } from "react";
import ReactModal from "react-modal";
import { useTheme } from "styled-components";
import { MdRefresh } from "react-icons/md";

import Slide from "~/components/common/Slide";
import CircularProgress from "~/components/common/CircularProgress";

import * as S from "./index.style";

interface ErrorModalProps extends Omit<ReactModal.Props, "style"> {
  message: string;
  onRetry?: () => void | Promise<void>;
}

export default function ErrorModal({
  message,
  onRetry,
  onRequestClose,
  isOpen,
  ...props
}: ErrorModalProps) {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);

  async function handleRetry() {
    if (loading) return;
    setLoading(true);
    await onRetry?.();
    setLoading(false);
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
            <S.Action
              backgroundColor={
                loading ? theme.grey3 : onRetry ? theme.grey2 : theme.primary3
              }
              onClick={onRequestClose}
              disabled={loading}
            >
              <S.ActionText color={loading ? theme.grey1 : theme.bg1}>
                닫기
              </S.ActionText>
            </S.Action>

            {onRetry && (
              <S.Action
                backgroundColor={loading ? theme.grey3 : theme.primary3}
                onClick={handleRetry}
                icon={
                  loading ? (
                    <CircularProgress size={24} color={theme.grey1} />
                  ) : (
                    <MdRefresh size="24" color={theme.bg1} />
                  )
                }
              >
                <S.ActionText color={loading ? theme.grey1 : theme.bg1}>
                  {loading ? "재시도 중..." : "재시도"}
                </S.ActionText>
              </S.Action>
            )}
          </S.ActionContainer>
        </Slide>
      </S.Content>
    </ReactModal>
  );
}
