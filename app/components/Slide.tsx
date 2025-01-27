import { useEffect, useRef, useState } from "react";

import { styled } from "styled-components";

const AnimatedDiv = styled.div<{
  $direction: string;
  $duration: number;
  $delay: number;
  $visible: boolean;
  $distance: string;
  $timingFunction: string;
}>`
  flex-shrink: 0;
  transition: transform
      ${({ $duration: duration, $timingFunction: timingFunction }) =>
        `${duration}ms ${timingFunction}`},
    opacity ${({ $duration: duration }) => duration}ms;
  transition-delay: ${({ $delay: delay }) => delay}ms;
  transform: ${({
    $direction: direction,
    $visible: visible,
    $distance: distance,
  }) =>
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
  initinalTransition?: boolean;
  timingFunction?: string;
}

export default function Slide({
  direction = "up",
  delay = 0,
  duration = 300,
  distance = "50px",
  visible,
  initinalTransition = true,
  timingFunction = "ease-in-out",
  children,
  ...props
}: SlideProps) {
  const [actualVisible, setActualVisible] = useState(
    initinalTransition ? !visible : visible
  );

  useEffect(() => {
    setActualVisible(visible);
  }, [visible]);

  return (
    <AnimatedDiv
      $direction={direction}
      $duration={duration}
      $visible={actualVisible}
      $delay={delay}
      $distance={distance}
      $timingFunction={timingFunction}
      {...props}
    >
      {children}
    </AnimatedDiv>
  );
}
