import { useContext, useState } from "react";
import ReactModal from "react-modal";
import { styled, ThemeContext } from "styled-components";
import { MdRefresh } from "react-icons/md";

import Button from "~/components/common/Button";
import Typography from "~/components/common/Typography";
import Slide from "~/components/common/Slide";
import CircularProgress from "~/components/common/CircularProgress";

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
  const theme = useContext(ThemeContext);
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
      <Content>
        <Slide
          visible={isOpen}
          delay={50}
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
        >
          <Actions>
            <Action
              backgroundColor={
                loading
                  ? theme?.grey3
                  : onRetry
                  ? theme?.grey2
                  : theme?.primary3
              }
              onClick={onRequestClose}
              disabled={loading}
            >
              <Typography
                color={loading ? theme?.grey1 : theme?.bg1}
                size="18px"
              >
                닫기
              </Typography>
            </Action>

            {onRetry && (
              <Action
                backgroundColor={loading ? theme?.grey3 : theme?.primary3}
                onClick={handleRetry}
                icon={
                  loading ? (
                    <CircularProgress size={24} color={theme?.grey1} />
                  ) : (
                    <MdRefresh size="24" color={theme?.bg1} />
                  )
                }
              >
                <Typography
                  color={loading ? theme?.grey1 : theme?.bg1}
                  size="18px"
                >
                  {loading ? "재시도 중..." : "재시도"}
                </Typography>
              </Action>
            )}
          </Actions>
        </Slide>
      </Content>
    </ReactModal>
  );
}
