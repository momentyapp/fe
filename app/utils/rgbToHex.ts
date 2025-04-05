export default function rgbToHex(r: number, g: number, b: number): string {
  const rNorm = Math.max(0, Math.min(255, Math.round(r)));
  const gNorm = Math.max(0, Math.min(255, Math.round(g)));
  const bNorm = Math.max(0, Math.min(255, Math.round(b)));
  const toHex = (decimal: number): string =>
    decimal.toString(16).padStart(2, "0");
  return `#${toHex(rNorm)}${toHex(gNorm)}${toHex(bNorm)}`;
}
