import { useState } from "react";
import ReactModal from "react-modal";
import { useTheme } from "styled-components";
import { MdAllInclusive, MdCheck } from "react-icons/md";

import Slide from "~/components/common/Slide";

import * as S from "./ExpireModal.style";

interface ExpireModalProps extends Omit<ReactModal.Props, "style"> {
  value: number;
  onSubmit: (expiresIn: number | undefined) => void;
}

export default function ExpireModal({
  value,
  onSubmit,
  onRequestClose,
  isOpen,
  ...props
}: ExpireModalProps) {
  const theme = useTheme();
  const [inputValue, setInputValue] = useState(value);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    let result = parseInt(event.target.value);
    result = Math.min(72, Math.max(0, result));
    setInputValue(isNaN(result) ? 0 : result);
  }

  function handleSubmit(event: React.MouseEvent) {
    if (inputValue === 0) onSubmit(undefined);
    else onSubmit(inputValue);
    onRequestClose?.(event);
  }

  function handlePermenant(event: React.MouseEvent) {
    onSubmit(undefined);
    onRequestClose?.(event);
  }

  return (
    <ReactModal
      closeTimeoutMS={200}
      onRequestClose={onRequestClose}
      isOpen={isOpen}
      {...props}
    >
      <S.Content>
        {/* 시간 입력 */}
        <Slide visible={isOpen} delay={50}>
          <S.TimeWrapper>
            <S.TimeInput
              value={inputValue}
              onChange={handleChange}
              backgroundColor={theme.bg3}
            />
            <S.TimeSuffix color={theme.grey1}>시간</S.TimeSuffix>
          </S.TimeWrapper>
        </Slide>

        {/* 하단 버튼 */}
        <Slide visible={isOpen} delay={100}>
          <S.ActionContainer>
            <S.Action
              backgroundColor={theme.primary3}
              icon={<MdAllInclusive size="24" color={theme.bg1} />}
              onClick={handlePermenant}
            >
              <S.ButtonText color={theme.bg1}>영구 게시</S.ButtonText>
            </S.Action>

            <S.Action
              backgroundColor={theme.primary3}
              icon={<MdCheck size="24" color={theme.bg1} />}
              onClick={handleSubmit}
            >
              <S.ButtonText color={theme.bg1}>완료</S.ButtonText>
            </S.Action>
          </S.ActionContainer>
        </Slide>
      </S.Content>
    </ReactModal>
  );
}
