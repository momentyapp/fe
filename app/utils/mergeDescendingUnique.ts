export default function mergeDescendingUnique(arr1: number[], arr2: number[]) {
  // TODO: 최적화
  /**
  const result: number[] = [];
  let i = 0;
  let j = 0;

  while (i < arr1.length || j < arr2.length) {
    const a = i < arr1.length ? arr1[i] : undefined;
    const b = j < arr2.length ? arr2[j] : undefined;

    let current: number | undefined;

    if (a !== undefined && (b === undefined || a > b)) {
      current = a;
      i++;
    } else if (b !== undefined && (a === undefined || b > a)) {
      current = b;
      j++;
    } else if (a !== undefined && b !== undefined && a === b) {
      current = a;
      i++;
      j++;
    }

    if (
      current !== undefined &&
      (result.length === 0 || result[result.length - 1] !== current)
    ) {
      result.push(current);
    }
  }
   */

  const result = Array.from(new Set([...arr1, ...arr2])).sort((a, b) => b - a);

  return result;
}
