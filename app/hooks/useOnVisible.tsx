import { useEffect, useMemo } from "react";

/**
 * 노드가 화면에 보일 때 콜백 함수를 호출하는 훅
 * @param onVisible 노드가 화면에 보일 때 호출할 콜백 함수
 * @param onInvisible 노드가 화면에서 사라질 때 호출할 콜백 함수
 * @param options IntersectionObserverInit
 * @returns 노드를 관찰할 ref
 */
export default function useOnVisible(
  onVisible?: (entry: IntersectionObserverEntry) => void,
  onInvisible?: (entry: IntersectionObserverEntry) => void,
  options: IntersectionObserverInit = { threshold: 0 }
) {
  const observer = useMemo(
    () =>
      new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) onVisible?.(entry);
          else onInvisible?.(entry);
        });
      }, options),
    [onVisible, onInvisible, options]
  );

  useEffect(() => {
    return () => observer.disconnect();
  }, [observer]);

  const observe = useMemo(
    () =>
      function (node: HTMLDivElement | null) {
        if (node !== null) {
          observer.observe(node);
        }
      },
    [observer]
  );

  return observe;
}
