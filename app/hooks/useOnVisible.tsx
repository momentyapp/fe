import { useCallback, useEffect, useMemo } from "react";

/**
 * 노드가 화면에 보일 때 콜백 함수를 호출하는 훅
 * @param callback 노드가 화면에 보일 때 호출할 콜백 함수
 * @returns 노드를 관찰할 ref
 */
export default function useOnVisible(callback: () => void) {
  const observer = useMemo(
    () =>
      new IntersectionObserver(
        (entries) => {
          if (entries[entries.length - 1].isIntersecting) callback();
        },
        { threshold: 0.01 }
      ),
    [callback]
  );

  useEffect(() => {
    return () => observer.disconnect();
  }, [observer]);

  const observe = useCallback(
    (node: HTMLDivElement | null) => {
      if (node !== null) {
        observer.observe(node);
      } else {
        observer.disconnect();
      }
    },
    [observer]
  );

  return observe;
}
