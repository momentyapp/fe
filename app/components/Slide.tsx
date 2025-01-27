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

const Wrapper = styled.div<{
  $direction: string;
  $duration: number;
  $delay: number;
  $visible: boolean;
  $distance: string;
  $timingFunction: string;
  $width: number;
  $height: number;
}>`
  display: flex;
  transition: width
    ${({ $duration: duration, $timingFunction: timingFunction }) =>
      `${duration}ms ${timingFunction}`};
  transition-delay: ${({ $delay: delay }) => delay}ms;
  width: ${({ $direction: direction, $visible: visible, $width: width }) =>
    direction === "up" || direction === "down"
      ? "auto"
      : visible
      ? `${width}px`
      : "0px"};
  height: ${({ $direction: direction, $visible: visible, $height: height }) =>
    direction === "left" || direction === "right"
      ? "auto"
      : visible
      ? `${height}px`
      : "0px"};
`;

interface SlideProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  duration?: number;
  distance?: string;
  visible: boolean;
  initinalTransition?: boolean;
  changeLayout?: boolean;
  timingFunction?: string;
}

export default function Slide({
  direction = "up",
  delay = 0,
  duration = 300,
  distance = "50px",
  visible,
  initinalTransition = true,
  changeLayout = false,
  timingFunction = "ease-in-out",
  children,
  ...props
}: SlideProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [actualVisible, setActualVisible] = useState(
    initinalTransition ? !visible : visible
  );
  const [rect, setRect] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    if (!wrapperRef.current) return;

    const observer = new ResizeObserver((entries) => {
      const contentRect = entries[0].contentRect;
      setRect([contentRect.width, contentRect.height]);
    });
    observer.observe(wrapperRef.current);

    return () => observer.disconnect();
  }, [wrapperRef]);

  useEffect(() => {
    setActualVisible(visible);
  }, [visible]);

  return changeLayout ? (
    <Wrapper
      $direction={direction}
      $duration={duration}
      $visible={actualVisible}
      $delay={delay}
      $distance={distance}
      $timingFunction={timingFunction}
      $width={rect[0]}
      $height={rect[1]}
      {...props}
    >
      <AnimatedDiv
        $direction={direction}
        $duration={duration}
        $visible={actualVisible}
        $delay={delay}
        $distance={distance}
        $timingFunction={timingFunction}
        ref={wrapperRef}
      >
        {children}
      </AnimatedDiv>
    </Wrapper>
  ) : (
    <AnimatedDiv
      $direction={direction}
      $duration={duration}
      $visible={actualVisible}
      $delay={delay}
      $distance={distance}
      $timingFunction={timingFunction}
      ref={wrapperRef}
    >
      {children}
    </AnimatedDiv>
  );
}
