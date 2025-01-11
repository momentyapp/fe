import { useState } from "react";
import { styled } from "styled-components";

const Wrapper = styled.div`
  display: flex;
  padding: 10px;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  background: ${(props) => props.theme.bg3};
  transition: background 0.1s;

  &:focus-within {
    background: ${(props) => props.theme.bg1};
  }
`;

const StyledInput = styled.input`
  background: none;
  border: none;
  outline: none;
  font-family: "Pretendard Variable";
  font-weight: 500;
  font-size: 16px;
  color: ${(props) => props.theme.grey2};
  transition: color 0.1s;

  &:focus,
  &:active {
    color: ${(props) => props.theme.grey1};
  }

  &:disabled {
    color: ${(props) => props.theme.grey3};
  }
`;

interface TextInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  icon?: React.ReactNode | ((focus: boolean) => React.ReactNode);
  iconPosition?: "left" | "right";
}

export default function TextInput({
  icon,
  iconPosition = "left",
  onFocus,
  onBlur,
  ...props
}: TextInputProps) {
  const [focus, setFocus] = useState(false);

  function handleFocus(e: React.FocusEvent<HTMLInputElement>) {
    setFocus(true);
    onFocus?.(e);
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    setFocus(false);
    onBlur?.(e);
  }

  const iconNode = typeof icon === "function" ? icon(focus) : icon;

  return (
    <Wrapper>
      {iconPosition === "left" && iconNode}
      <StyledInput
        {...props}
        onFocus={handleFocus}
        onBlur={handleBlur}
        type="text"
        placeholder="검색어를 입력하세요."
      />
      {iconPosition === "right" && iconNode}
    </Wrapper>
  );
}
