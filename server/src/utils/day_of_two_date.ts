export function dayOfTwoDate(date2: Date, date1: Date) {
  const diffInTime = date2.getTime() - date1.getTime();
  return diffInTime / (1000 * 3600 * 24);
}
