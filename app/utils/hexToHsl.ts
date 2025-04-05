/**
 * Hexadecimal 색상 문자열을 HSL (Hue, Saturation, Lightness) 객체로 변환합니다.
 *
 * @param hex - 변환할 Hex 색상 문자열 (예: "#RRGGBB", "#RGB").
 * @returns HSL 색상 객체 { h: number, s: number, l: number } 또는 잘못된 입력 시 null.
 * h는 0-360 사이의 각도, s와 l은 0-100 사이의 백분율입니다.
 */
export default function hexToHsl(
  hex: string
): { h: number; s: number; l: number } | null {
  // '#' 제거
  let cleanHex = hex.startsWith("#") ? hex.slice(1) : hex;

  // Hex 길이 확인 및 확장 (RGB -> RRGGBB)
  if (cleanHex.length === 3) {
    cleanHex =
      cleanHex[0] +
      cleanHex[0] +
      cleanHex[1] +
      cleanHex[1] +
      cleanHex[2] +
      cleanHex[2];
  }

  // 유효한 Hex 형식인지 확인 (6자리 16진수)
  if (cleanHex.length !== 6 || !/^[0-9a-fA-F]{6}$/.test(cleanHex)) {
    console.error("Invalid HEX color format provided.");
    return null;
  }

  // R, G, B 값을 0-255 범위로 파싱
  const r255 = parseInt(cleanHex.substring(0, 2), 16);
  const g255 = parseInt(cleanHex.substring(2, 4), 16);
  const b255 = parseInt(cleanHex.substring(4, 6), 16);

  // R, G, B 값을 0-1 범위로 정규화
  const r = r255 / 255;
  const g = g255 / 255;
  const b = b255 / 255;

  // 최소값과 최대값 찾기
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  let h = 0; // Hue
  let s = 0; // Saturation
  let l = (max + min) / 2; // Lightness

  if (max === min) {
    // 무채색 (회색 계열)
    h = 0;
    s = 0;
  } else {
    const delta = max - min;
    // 채도 계산
    s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);

    // 색상(Hue) 계산
    switch (max) {
      case r:
        h = (g - b) / delta + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / delta + 2;
        break;
      case b:
        h = (r - g) / delta + 4;
        break;
    }
    h /= 6; // 0-1 범위로 조정
  }

  // 최종 HSL 값으로 변환 (H: 0-360, S/L: 0-100%)
  const finalH = Math.round(h * 360);
  const finalS = Math.round(s * 100);
  const finalL = Math.round(l * 100);

  return { h: finalH, s: finalS, l: finalL };
}
