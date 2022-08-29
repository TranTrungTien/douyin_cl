export function getBoundingClientRect(id: string) {
  return document.getElementById(id)?.getBoundingClientRect();
}
