import { styled } from "styled-components";

import Pressable from "~/components/common/Pressable";

const Wrapper = styled(Pressable)`
  display: flex;
`;

const Background = styled.div<{ $value: boolean }>`
  width: 50px;
  height: 25px;
  border-radius: 12.5px;
  background-color: ${(props) =>
    props.$value ? props.theme.primary3 : props.theme.grey2};
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Circle = styled.div<{ $value: boolean }>`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.bg3};
  transform: translateX(${(props) => (props.$value ? 10 : -10)}px);
  transition: transform 0.2s;
`;

interface SwitchProps {
  value?: boolean;
  onChange?: (value: boolean) => void;
}

export default function Switch({ value = false, onChange }: SwitchProps) {
  function handleClick() {
    onChange?.(!value);
  }

  return (
    <Wrapper onClick={handleClick}>
      <Background $value={value}>
        <Circle $value={value} />
      </Background>
    </Wrapper>
  );
}
