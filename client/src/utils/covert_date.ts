export const convertDate = (date?: string): string => {
  if (!date) return "";
  const d = new Date(date);
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
};
