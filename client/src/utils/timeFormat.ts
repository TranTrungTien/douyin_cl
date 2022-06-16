import { sToSM } from "./sToSM";

export function timeFormat(seconds: number): string {
  const { m, s } = sToSM(seconds);
  return `${m > 10 ? m : "0" + m}:${s > 10 ? s : "0" + s}`;
}
