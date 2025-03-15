import { useCallback, useEffect, useMemo } from "react";

export default function useInfiniteMoments(onLoadMore: () => void) {
  const observer = useMemo(
    () =>
      new IntersectionObserver(
        (entries) => {
          if (entries[entries.length - 1].isIntersecting) onLoadMore();
        },
        { threshold: 0.01 }
      ),
    [onLoadMore]
  );

  useEffect(() => {
    return () => observer.disconnect();
  }, [observer]);

  const observeEnd = useCallback(
    (node: HTMLDivElement | null) => {
      if (node !== null) {
        observer.observe(node);
      } else {
        observer.disconnect();
      }
    },
    [observer]
  );

  return {
    observeEnd,
  };
}
