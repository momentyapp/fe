import hexToHsl from "./hexToHsl";
import hslToHex from "./hslToHex";

export default function getTapColor(originColor: string) {
  const hsl = hexToHsl(originColor);
  if (hsl === null) return null;

  const { h, s, l } = hsl;
  if (l < 5) return hslToHex({ h, s, l: l + 10 });
  else return hslToHex({ h, s, l: l - 5 });
}
