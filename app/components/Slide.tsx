import { useEffect, useState } from "react";

import { styled } from "styled-components";

const StyledDiv = styled.div<{
  $direction: string;
  $duration: number;
  $delay: number;
  $visible: boolean;
  $distance: string;
}>`
  transition: transform ${({ $duration: duration }) => duration}ms ease-in-out,
    opacity ${({ $duration: duration }) => duration}ms ease-in-out;
  transition-delay: ${({ $delay: delay }) => delay}ms;
  transform: ${({ $direction: direction, $visible: visible, $distance: distance }) =>
    visible
      ? "none"
      : `translate${direction === "up" || direction === "down" ? "Y" : "X"}(${
          direction === "up" || direction === "left" ? "" : "-"
        }${distance})`};
  opacity: ${({ $visible: visible }) => (visible ? 1 : 0)};
`;

interface SlideProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  duration?: number;
  distance?: string;
  visible: boolean;
}

export default function Slide({
  direction = "up",
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
    <StyledDiv
      $direction={direction}
      $duration={duration}
      $visible={actualVisible}
      $delay={delay}
      $distance={distance}
      {...props}
    >
      {children}
    </StyledDiv>
  );
}
