export default function isDarkColor(color: string): boolean {
  try {
    let r = parseInt(color.substring(1, 3), 16);
    let g = parseInt(color.substring(3, 5), 16);
    let b = parseInt(color.substring(5, 7), 16);
    return r * 0.299 + g * 0.587 + b * 0.114 <= 186;
  } catch (e) {
    return false;
  }
}
