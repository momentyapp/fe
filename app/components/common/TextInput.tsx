import { useContext, useState } from "react";
import { styled, ThemeContext } from "styled-components";

import isDarkColor from "~/utils/hexToHsl";

const Wrapper = styled.div<{ $background: string }>`
  display: flex;
  padding: 10px;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  background: ${(props) => props.$background};
  transition: background 0.1s, filter 0.1s;

  &:not(:disabled):focus-within {
    filter: brightness(
      ${(props) => (isDarkColor(props.$background) ? "120%" : "80%")}
    );
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

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode | ((focus: boolean) => React.ReactNode);
  iconPosition?: "left" | "right";
  backgroundColor?: string;
}

export default function TextInput({
  icon,
  iconPosition = "left",
  backgroundColor,
  type = "text",
  onFocus,
  onBlur,
  ...props
}: TextInputProps) {
  const theme = useContext(ThemeContext);

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
    <Wrapper $background={backgroundColor ?? theme?.bg3 ?? "transparent"}>
      {iconPosition === "left" && iconNode}
      <StyledInput
        {...props}
        onFocus={handleFocus}
        onBlur={handleBlur}
        type={type}
      />
      {iconPosition === "right" && iconNode}
    </Wrapper>
  );
}
