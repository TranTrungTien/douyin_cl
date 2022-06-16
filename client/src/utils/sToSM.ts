export function sToSM(s: number): { s: number; m: number } {
  const minutes = Math.floor(s / 60);
  const seconds = Math.floor(s % 60);
  return { s: seconds, m: minutes };
}
