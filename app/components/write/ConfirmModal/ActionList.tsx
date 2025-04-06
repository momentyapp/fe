import { styled, useTheme } from "styled-components";
import { MdSend } from "react-icons/md";

import Button from "~/components/common/Button";
import Typography from "~/components/common/Typography";
import CircularProgress from "~/components/common/CircularProgress";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  gap: 5px;
`;

const Action = styled(Button)`
  width: 100%;
`;

interface ActionListProps {
  loading: boolean;
  onCancel: (event: React.MouseEvent | React.KeyboardEvent) => void;
  onPost: () => void;
}

export default function ActionList({
  loading,
  onCancel: handleRequestClose,
  onPost,
}: ActionListProps) {
  const theme = useTheme();

  return (
    <Wrapper>
      <Action
        backgroundColor={loading ? theme.grey3 : theme.grey2}
        onClick={handleRequestClose}
        disabled={loading}
      >
        <Typography color={loading ? theme.grey1 : theme.bg1} size="18px">
          취소
        </Typography>
      </Action>
      <Action
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
        <Typography color={loading ? theme.grey1 : theme.bg1} size="18px">
          {loading ? "게시 중..." : "게시하기"}
        </Typography>
      </Action>
    </Wrapper>
  );
}
