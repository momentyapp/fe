import { type Ref } from "react";
import { styled } from "styled-components";

import isDarkColor from "~/utils/isDarkColor";

const Wrapper = styled.button<{ $background: string }>`
  border: none;
  cursor: pointer;
  background: ${(props) => props.$background};
  transition: background 0.2s, filter 0.2s, transform 0.1s ease-in-out;
  -webkit-tap-highlight-color: transparent;

  &:not(:disabled):focus-visible {
    transform: scale(1.05);
    filter: brightness(
      ${(props) => (isDarkColor(props.$background) ? "120%" : "80%")}
    );
  }

  &:not(:disabled):active {
    transform: scale(0.95);
    filter: brightness(
      ${(props) => (isDarkColor(props.$background) ? "140%" : "60%")}
    );
  }
`;

export interface PressableProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  backgroundColor?: string;
  ref?: Ref<HTMLButtonElement>;
}

export default function Pressable({
  children,
  backgroundColor = "transparent",
  ref,
  ...props
}: PressableProps) {
  return (
    <Wrapper ref={ref} {...props} $background={backgroundColor}>
      {children}
    </Wrapper>
  );
}
