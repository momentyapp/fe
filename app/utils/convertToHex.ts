import { MotionValue } from "framer-motion";
import type { Property } from "csstype";

import hslToHex from "./hslToHex";
import rgbToHex from "./rgbToHex";

interface CustomValueType {
  mix: (from: any, to: any) => (p: number) => number | string;
  toValue: () => number | string;
}

type ColorInputType =
  | MotionValue<number>
  | MotionValue<string>
  | CustomValueType
  | MotionValue<any>
  | Property.BackgroundColor
  | undefined;

/**
 * Attempts to resolve various color input types (including MotionValue)
 * into a standard #RRGGBB hex color string.
 * Returns null if the input cannot be resolved to a supported color format.
 *
 * @param colorInput The input value potentially containing a color.
 * @returns A hex color string (#RRGGBB) or null.
 */
export default function convertToHex(
  colorInput: ColorInputType
): string | null {
  let baseValue: unknown;

  // 1. Extract base value based on input type
  if (colorInput === undefined || colorInput === null) {
    return null;
  }

  if (colorInput instanceof MotionValue) {
    baseValue = colorInput.get();
  } else if (
    typeof colorInput === "object" &&
    "toValue" in colorInput &&
    typeof colorInput.toValue === "function"
  ) {
    // Duck-typing for CustomValueType
    try {
      baseValue = (colorInput as CustomValueType).toValue();
    } catch (e) {
      console.error("Error calling toValue() on CustomValueType:", e);
      return null;
    }
  } else {
    // Assumed to be Property.BackgroundColor (which is likely a string) or already a base value
    baseValue = colorInput;
  }

  // 2. Process the extracted base value (expecting a string)
  if (typeof baseValue !== "string") {
    // Cannot process non-string values (like numbers directly)
    return null;
  }

  const colorString = baseValue.trim().toLowerCase();

  // 3. Handle simple cases and known keywords
  if (!colorString) {
    return null;
  }
  if (colorString === "transparent") {
    // Represent transparent as null, or you could return '#00000000' if RGBA hex is acceptable
    return null;
  }

  // --- Color String Parsing and Conversion ---

  // 4. Check for Hex (#RRGGBB or #RGB)
  const hexMatch = colorString.match(/^#?([a-f0-9]{6}|[a-f0-9]{3})$/);
  if (hexMatch) {
    let hex = hexMatch[1];
    if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    return `#${hex}`;
  }

  // 5. Check for RGB/RGBA (rgb(r, g, b) or rgba(r, g, b, a))
  // Handles optional spaces, percentages are NOT handled here for simplicity
  const rgbMatch = colorString.match(
    /^rgba?\((\s*\d+\s*),(\s*\d+\s*),(\s*\d+\s*)/
  );
  if (rgbMatch) {
    const r = parseInt(rgbMatch[1].trim(), 10);
    const g = parseInt(rgbMatch[2].trim(), 10);
    const b = parseInt(rgbMatch[3].trim(), 10);
    if (!isNaN(r) && !isNaN(g) && !isNaN(b)) {
      return rgbToHex(r, g, b);
    }
  }

  // 6. Check for HSL/HSLA (hsl(h, s%, l%) or hsla(h, s%, l%, a))
  // Handles optional spaces, assumes s and l are percentages
  const hslMatch = colorString.match(
    /^hsla?\((\s*[\d.]+?\s*),(\s*\d+?%?\s*),(\s*\d+?%?\s*)/
  );
  if (hslMatch) {
    const h = parseFloat(hslMatch[1].trim());
    // Assume '%' is present for s and l, remove it
    const s = parseFloat(hslMatch[2].trim().replace("%", ""));
    const l = parseFloat(hslMatch[3].trim().replace("%", ""));

    if (!isNaN(h) && !isNaN(s) && !isNaN(l)) {
      // Use the existing hslToHex function
      return hslToHex(h, s, l);
    }
  }

  const namedColorMap: { [key: string]: string } = {
    transparent: "#00000000",
    red: "#ff0000",
    green: "#008000",
    blue: "#0000ff",
    white: "#ffffff",
    black: "#000000",
    // ... add more common names
  };
  if (namedColorMap[colorString]) {
    return namedColorMap[colorString];
  }

  // 8. If none of the formats match
  console.warn(`Could not parse color string: "${colorString}"`);
  return null;
}
