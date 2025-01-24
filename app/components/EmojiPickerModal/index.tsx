import { useContext } from "react";
import ReactModal from "react-modal";
import { styled, ThemeContext } from "styled-components";
import { MdClose } from "react-icons/md";

import Button from "~/components/Button";
import Typography from "~/components/Typography";
import Slide from "~/components/Slide";

import EmojiList from "./EmojiList";

const Content = styled.div`
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 10px;
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
  isOpen,
  ...props
}: EmojiPickerModal) {
  const theme = useContext(ThemeContext);

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
          <EmojiList onSelect={onSelect} myEmoji={myEmoji} />
        </Slide>

        {/* 하단 버튼 */}
        <Slide
          visible={isOpen}
          delay={100}
          timingFunction="cubic-bezier(0.17,0.84,0.44,1)"
        >
          <StyledButton
            backgroundColor={theme?.primary3}
            icon={<MdClose size="24" color={theme?.bg1} />}
            onClick={onRequestClose}
          >
            <Typography color={theme?.bg1} size="18px">
              닫기
            </Typography>
          </StyledButton>
        </Slide>
      </Content>
    </ReactModal>
  );
}
