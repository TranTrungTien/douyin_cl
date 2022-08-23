export const convertDate = (date?: string): string => {
  if (!date) return "";
  const d = new Date(date);
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
};

export const covertVideoTime = (seconds?: number) => {
  if (!seconds) return;
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds - m * 60);
  return m + ":" + (s < 10 ? "0" : "") + s;
};
