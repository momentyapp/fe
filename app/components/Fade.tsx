import { useEffect, useState } from "react";

import { styled } from "styled-components";

const StyledDiv = styled.div<{
  $duration: number;
  $delay: number;
  $visible: boolean;
}>`
  transition: opacity ${({ $duration: duration }) => duration}ms;
  transition-delay: ${({ $delay: delay }) => delay}ms;
  opacity: ${({ $visible: visible }) => (visible ? 1 : 0)};
`;

interface SlideProps extends React.HTMLAttributes<HTMLDivElement> {
  delay?: number;
  duration?: number;
  distance?: string;
  visible: boolean;
}

export default function Slide({
  delay = 0,
  duration = 200,
  distance = "50px",
  visible,
  children,
  ...props
}: SlideProps) {
  const [actualVisible, setActualVisible] = useState(false);

  useEffect(() => {
    setActualVisible(visible);
  }, [visible]);

  return (
    <StyledDiv $duration={duration} $visible={actualVisible} $delay={delay} {...props}>
      {children}
    </StyledDiv>
  );
}
