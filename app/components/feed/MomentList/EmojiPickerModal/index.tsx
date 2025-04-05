import ReactModal from "react-modal";
import { useTheme } from "styled-components";
import { MdClose } from "react-icons/md";

import Slide from "~/components/common/Slide";

import * as S from "./index.style";

import EmojiContainer from "./EmojiContainer";

interface EmojiPickerModalProps extends Omit<ReactModal.Props, "style"> {
  onSelect: (emoji: string) => void;
  myEmoji?: string;
}

export default function EmojiPickerModal({
  onSelect,
  myEmoji,
  onRequestClose,
  isOpen,
  ...props
}: EmojiPickerModalProps) {
  const theme = useTheme();

  return (
    <ReactModal
      closeTimeoutMS={200}
      onRequestClose={onRequestClose}
      isOpen={isOpen}
      {...props}
    >
      <S.Content>
        <Slide visible={isOpen} delay={50}>
          <EmojiContainer onSelect={onSelect} myEmoji={myEmoji} />
        </Slide>

        {/* 하단 버튼 */}
        <Slide visible={isOpen} delay={100}>
          <S.FullWidthButton
            backgroundColor={theme.primary3}
            icon={<MdClose size="24" color={theme.bg1} />}
            onClick={onRequestClose}
          >
            <S.ButtonText color={theme.bg1}>닫기</S.ButtonText>
          </S.FullWidthButton>
        </Slide>
      </S.Content>
    </ReactModal>
  );
}
