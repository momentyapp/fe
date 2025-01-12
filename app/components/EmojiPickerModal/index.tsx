import { useContext } from "react";
import ReactModal from "react-modal";
import { styled, ThemeContext } from "styled-components";
import { MdClose } from "react-icons/md";

import Button from "~/components/Button";
import Typography from "~/components/Typography";

import EmojiList from "./EmojiList";

const Content = styled.div`
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Part = styled.div`
  width: 100%;
`;

const StyledButton = styled(Button)`
  width: 100%;
`;

interface EmojiPickerModal extends Omit<ReactModal.Props, "style"> {
  onSelect: (emoji: string) => void;
  myEmoji?: string;
}

export default function TopicModal({
  onSelect,
  myEmoji,
  onRequestClose,
  ...props
}: EmojiPickerModal) {
  const theme = useContext(ThemeContext);

  return (
    <ReactModal closeTimeoutMS={300} onRequestClose={onRequestClose} {...props}>
      <Content>
        <Part>
          <EmojiList onSelect={onSelect} myEmoji={myEmoji} />
        </Part>

        {/* 하단 버튼 */}
        <Part>
          <StyledButton
            backgroundColor={theme?.primary3}
            icon={<MdClose size="24" color={theme?.bg1} />}
            onClick={onRequestClose}
          >
            <Typography color={theme?.bg1} size="18px">
              닫기
            </Typography>
          </StyledButton>
        </Part>
      </Content>
    </ReactModal>
  );
}
