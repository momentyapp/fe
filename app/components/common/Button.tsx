import { useState } from "react";
import { styled } from "styled-components";

import Pressable, { type PressableProps } from "~/components/common/Pressable";

const StyledPressable = styled(Pressable)`
  display: flex;
  flex-direction: row;
  padding: 15px 20px;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

interface ButtonProps extends Omit<PressableProps, "children"> {
  icon?: React.ReactNode | ((focus: boolean) => React.ReactNode);
  iconPosition?: "left" | "right";
  align?: "left" | "center" | "right";
  children?: React.ReactNode;
}

export default function Button({
  icon,
  iconPosition = "left",
  align = "center",
  children,
  onFocus,
  onBlur,
  ...props
}: ButtonProps) {
  const [focus, setFocus] = useState(false);

  function handleFocus(e: React.FocusEvent<HTMLButtonElement>) {
    setFocus(true);
    onFocus?.(e);
  }

  function handleBlur(e: React.FocusEvent<HTMLButtonElement>) {
    setFocus(false);
    onBlur?.(e);
  }

  const iconNode = typeof icon === "function" ? icon(focus) : icon;

  return (
    <StyledPressable {...props} onFocus={handleFocus} onBlur={handleBlur}>
      {iconPosition === "left" && iconNode}
      {children}
      {iconPosition === "right" && iconNode}
    </StyledPressable>
  );
}
