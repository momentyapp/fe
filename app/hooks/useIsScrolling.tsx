import { useEffect, useState } from "react";

export default function useIsScrolling(node: HTMLElement | Window = window) {
  const [isScrolling, setIsScrolling] = useState(false);

  // 스크롤 중인지 감지
  useEffect(() => {
    // 스크롤 디바운싱
    let lastTimeout: NodeJS.Timeout | null = null;
    node.addEventListener("scroll", handleScroll);

    function handleScroll() {
      setIsScrolling(true);
      if (lastTimeout !== null) clearTimeout(lastTimeout);
      lastTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 100);
    }

    return () => node.removeEventListener("scroll", handleScroll);
  }, [node, setIsScrolling]);

  return isScrolling;
}
