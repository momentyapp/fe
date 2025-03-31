import { useContext, useEffect, useRef } from "react";
import { useInView } from "motion/react";
import { styled, ThemeContext } from "styled-components";

import CircularProgress from "~/components/common/CircularProgress";

const Wrapper = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface EndProps {
  isLoading: boolean;
  onTrigger: () => void;
}

export default function End({ isLoading, onTrigger }: EndProps) {
  const ref = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const theme = useContext(ThemeContext);
  const isInView = useInView(ref, { initial: false, margin: "500px" });

  useEffect(() => {
    // 스크롤 디바운싱
    if (isInView) {
      timeoutRef.current = setTimeout(onTrigger, 50);
    } else {
      if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
    }
  }, [isInView]);

  return (
    <Wrapper ref={ref}>
      {isLoading && <CircularProgress size={36} color={theme?.grey2} />}
    </Wrapper>
  );
}
