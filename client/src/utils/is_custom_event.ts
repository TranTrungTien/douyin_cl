export function isCustomEvent(cEvent: Event): cEvent is CustomEvent {
  return "detail" in cEvent;
}
