import { useMemo } from "react";

import getFocusColor from "~/utils/getFocusColor";
import getTapColor from "~/utils/getTapColor";

import type { HexColor } from "common";

export default function useColorFeedback(origin: HexColor) {
  const { cleanHex, opacity } = useMemo(() => {
    if (origin.length === 9) {
      const cleanHex = origin.slice(0, 7);
      const opacity = origin.slice(7, 9);
      return { cleanHex, opacity };
    }

    if (origin.length === 7) {
      return { cleanHex: origin, opacity: null };
    }

    return { cleanHex: null, opacity: null };
  }, [origin]);

  const { tapColor, focusColor } = useMemo(
    () => ({
      tapColor: cleanHex
        ? `${getTapColor(cleanHex)}${opacity ? opacity : ""}`
        : null,
      focusColor: cleanHex
        ? `${getFocusColor(cleanHex)}${opacity ? opacity : ""}`
        : null,
    }),
    [cleanHex, opacity]
  );

  return { tapColor, focusColor };
}
