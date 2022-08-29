export const convertDateToTime = (date?: string): string => {
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

export function sToSM(s: number): { s: number; m: number } {
  const minutes = Math.floor(s / 60);
  const seconds = Math.floor(s % 60);
  return { s: seconds, m: minutes };
}

export function timeFormat(seconds: number): string {
  const { m, s } = sToSM(seconds);
  return `${m >= 10 ? m : "0" + m}:${s >= 10 ? s : "0" + s}`;
}

export function getDayFromVideoUploaded(date?: string) {
  if (!date) return;
  const d = new Date(date);
  const currentDate = new Date();
  const years = currentDate.getFullYear() - d.getFullYear(); // Year		[yyyy]
  if (years < 1) {
    const months = currentDate.getMonth() + 1 - (d.getMonth() + 1); // Month	[mm]	(1 - 12)
    if (months < 1) {
      return currentDate.getDate() - d.getDate();
    } else return months;
  } else return years;
}
