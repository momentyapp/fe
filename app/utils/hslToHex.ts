/**
 * HSL 색상 값 (객체 또는 개별 값)을 Hexadecimal 색상 문자열로 변환합니다.
 *
 * @param h - 색상(Hue), 0-360 범위의 숫자.
 * @param s - 채도(Saturation), 0-100 범위의 숫자 (백분율).
 * @param l - 명도(Lightness), 0-100 범위의 숫자 (백분율).
 * @returns Hex 색상 문자열 (예: "#RRGGBB") 또는 잘못된 입력 시 null.
 */
export default function hslToHex(h: number, s: number, l: number): string;
/**
 * HSL 색상 객체를 Hexadecimal 색상 문자열로 변환합니다.
 *
 * @param hsl - HSL 색상 객체 { h: number, s: number, l: number }.
 * @returns Hex 색상 문자열 (예: "#RRGGBB") 또는 잘못된 입력 시 null.
 */
export default function hslToHex(hsl: {
  h: number;
  s: number;
  l: number;
}): string;

export default function hslToHex(
  hOrObj: number | { h: number; s: number; l: number },
  s?: number,
  l?: number
): string {
  let h: number, sat: number, lig: number;

  // 입력 타입에 따라 h, s, l 값 설정
  if (typeof hOrObj === "object") {
    h = hOrObj.h;
    sat = hOrObj.s;
    lig = hOrObj.l;
  } else if (s !== undefined && l !== undefined) {
    h = hOrObj;
    sat = s;
    lig = l;
  } else {
    // 잘못된 인자 조합
    console.error("Invalid arguments provided to hslToHex.");
    // 실제로는 에러를 던지거나 null을 반환하는 것이 더 적절할 수 있습니다.
    // 여기서는 기본값으로 검정색을 반환하도록 하겠습니다.
    return "#000000";
  }

  // 입력 값 범위 확인 및 조정 (선택적이지만 권장)
  h = Math.max(0, Math.min(360, h));
  sat = Math.max(0, Math.min(100, sat));
  lig = Math.max(0, Math.min(100, lig));

  // HSL 값을 0-1 범위로 정규화
  const sNorm = sat / 100;
  const lNorm = lig / 100;

  // ---- HSL -> RGB 변환 알고리즘 ----
  // 출처: https://www.w3.org/TR/css-color-3/#hsl-color 참조 및 변형
  const chroma = (1 - Math.abs(2 * lNorm - 1)) * sNorm;
  const hPrime = h / 60; // Hue를 60도 섹터로 나눔
  const x = chroma * (1 - Math.abs((hPrime % 2) - 1));
  const m = lNorm - chroma / 2;

  let rTemp = 0,
    gTemp = 0,
    bTemp = 0;

  if (hPrime >= 0 && hPrime < 1) {
    [rTemp, gTemp, bTemp] = [chroma, x, 0];
  } else if (hPrime >= 1 && hPrime < 2) {
    [rTemp, gTemp, bTemp] = [x, chroma, 0];
  } else if (hPrime >= 2 && hPrime < 3) {
    [rTemp, gTemp, bTemp] = [0, chroma, x];
  } else if (hPrime >= 3 && hPrime < 4) {
    [rTemp, gTemp, bTemp] = [0, x, chroma];
  } else if (hPrime >= 4 && hPrime < 5) {
    [rTemp, gTemp, bTemp] = [x, 0, chroma];
  } else if (hPrime >= 5 && hPrime < 6) {
    [rTemp, gTemp, bTemp] = [chroma, 0, x];
  }

  // 계산된 값에 m을 더하고 0-255 범위로 변환
  const r = Math.round((rTemp + m) * 255);
  const g = Math.round((gTemp + m) * 255);
  const b = Math.round((bTemp + m) * 255);
  // ------------------------------------

  // RGB 값을 16진수 문자열로 변환하는 헬퍼 함수
  const toHex = (decimal: number): string => {
    const hex = decimal.toString(16);
    // 항상 두 자리수가 되도록 앞에 0을 붙임 (예: 5 -> "05", 10 -> "0a")
    return hex.length === 1 ? "0" + hex : hex;
  };

  // 최종 Hex 문자열 조합
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
