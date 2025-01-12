export default function getRelativeTime(date: Date): string {
  const now = new Date();
  const diffInMilliseconds = now.getTime() - date.getTime();
  const diffInMinutes = Math.floor(diffInMilliseconds / 1000 / 60);

  if (diffInMinutes >= 365 * 24 * 60) {
    const years = Math.floor(diffInMinutes / 365 / 24 / 60);
    return `${years}년 전`;
  } else if (diffInMinutes >= 30 * 24 * 60) {
    const months = Math.floor(diffInMinutes / 30 / 24 / 60);
    return `${months}달 전`;
  } else if (diffInMinutes >= 7 * 24 * 60) {
    const weeks = Math.floor(diffInMinutes / 7 / 24 / 60);
    return `${weeks}주 전`;
  } else if (diffInMinutes >= 24 * 60) {
    const days = Math.floor(diffInMinutes / 24 / 60);
    return `${days}일 전`;
  } else if (diffInMinutes >= 60) {
    const hours = Math.floor(diffInMinutes / 60);
    return `${hours}시간 전`;
  } else if (diffInMinutes >= 1) {
    return `${diffInMinutes}분 전`;
  } else {
    return "방금 전";
  }
}
