import { useEffect, useState } from "react";

import { styled } from "styled-components";

const StyledDiv = styled.div<{
  $duration: number;
  $delay: number;
  $visible: boolean;
}>`
  transition: transform ${({ $duration: duration }) => duration}ms
      cubic-bezier(0.42, 0, 0.48, 1.33),
    opacity ${({ $duration: duration }) => duration}ms;
  transition-delay: ${({ $delay: delay }) => delay}ms;
  transform: scale(${({ $visible: visible }) => (visible ? "1" : "0")});
  opacity: ${({ $visible: visible }) => (visible ? 1 : 0)};
`;

interface PopProps extends React.HTMLAttributes<HTMLDivElement> {
  delay?: number;
  duration?: number;
  visible: boolean;
  initinalTransition?: boolean;
}

export default function Pop({
  delay = 0,
  duration = 200,
  visible,
  initinalTransition = true,
  children,
  ...props
}: PopProps) {
  const [actualVisible, setActualVisible] = useState(
    initinalTransition ? !visible : visible
  );

  useEffect(() => {
    setActualVisible(visible);
  }, [visible]);

  return (
    <StyledDiv
      $duration={duration}
      $visible={actualVisible}
      $delay={delay}
      {...props}
    >
      {children}
    </StyledDiv>
  );
}
