import { useContext, useState } from "react";
import ReactModal from "react-modal";
import { styled, ThemeContext } from "styled-components";
import { MdAllInclusive, MdCheck } from "react-icons/md";

import Button from "~/components/common/Button";
import Typography from "~/components/common/Typography";
import Slide from "~/components/common/Slide";
import TextInput from "~/components/common/TextInput";

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
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
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

const StyledTextInput = styled(TextInput)`
  width: 50px;
  height: 36px;
  font-size: 24px;
  text-align: center;
`;

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
  const theme = useContext(ThemeContext);
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
      <Content>
        <Slide visible={isOpen} delay={50}>
          <StyledDiv>
            <StyledTextInput value={inputValue} onChange={handleChange} />
            <Typography size="24px" color={theme?.grey1}>
              시간
            </Typography>
          </StyledDiv>
        </Slide>

        {/* 하단 버튼 */}
        <Slide visible={isOpen} delay={100}>
          <Actions>
            <Action
              backgroundColor={theme?.primary3}
              icon={<MdAllInclusive size="24" color={theme?.bg1} />}
              onClick={handlePermenant}
            >
              <Typography color={theme?.bg1} size="18px">
                영구 게시
              </Typography>
            </Action>
            <Action
              backgroundColor={theme?.primary3}
              icon={<MdCheck size="24" color={theme?.bg1} />}
              onClick={handleSubmit}
            >
              <Typography color={theme?.bg1} size="18px">
                완료
              </Typography>
            </Action>
          </Actions>
        </Slide>
      </Content>
    </ReactModal>
  );
}
