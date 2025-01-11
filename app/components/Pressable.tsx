import { styled } from "styled-components";

import isDarkColor from "~/utils/isDarkColor";

const Wrapper = styled.button<{ $background: string }>`
  border: none;
  cursor: pointer;
  background: ${(props) => props.$background};
  transition: background 0.2s, filter 0.2s, transform 0.1s ease-in-out;
  -webkit-tap-highlight-color: transparent;

  &:focus-visible {
    transform: scale(1.05);
    filter: brightness(
      ${(props) => (isDarkColor(props.$background) ? "110%" : "90%")}
    );
  }

  &:active {
    transform: scale(0.95);
    filter: brightness(
      ${(props) => (isDarkColor(props.$background) ? "120%" : "80%")}
    );
  }
`;

const Content = styled.div``;

interface PressableProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  backgroundColor?: string;
}

export default function Pressable({
  children,
  backgroundColor = "#0000000",
  ...props
}: PressableProps) {
  return (
    <Wrapper {...props} $background={backgroundColor}>
      <Content>{children}</Content>
    </Wrapper>
  );
}
