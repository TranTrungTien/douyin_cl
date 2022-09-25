let elementToTop: null | number = null;
function sliderDraggable(
  element: HTMLElement,
  elementContainers: HTMLElement,
  direction: "vertical" | "horizontal",
  callback?: (value: number, dimensionUI: number) => void
) {
  const containerBounds = elementContainers.getBoundingClientRect();

  function handleMove(e: PointerEvent) {
    const { pageX, pageY } = e;
    if (direction === "horizontal") {
      const offsetX = pageX - containerBounds.left;
      const width = containerBounds.width - offsetX;
      if (width >= containerBounds.width || width <= 0) return;
      callback && callback(offsetX, width);
    } else if (direction === "vertical") {
      !elementToTop && (elementToTop = containerBounds.top);
      const offsetY = pageY - (elementToTop || 687.78125);
      const height = containerBounds.height - offsetY;
      if (height >= containerBounds.height || height <= 0) return;
      const volume = (offsetY / containerBounds.height) * 1;

      callback && callback(volume, height);
    }
  }
  element.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    e.stopPropagation();
    document.addEventListener("pointermove", handleMove, true);
  });

  document.addEventListener("pointerup", function stop(e) {
    document.removeEventListener("pointermove", handleMove, true);
  });
}

export function sliderDraggableHorizontal(
  element: HTMLElement,
  elementContainers: HTMLElement,
  callback?: (timeSeek: number, widthUI: number) => void
) {
  sliderDraggable(element, elementContainers, "horizontal", callback);
}
export function sliderDraggableVertical(
  element: HTMLElement,
  elementContainers: HTMLElement,
  callback?: (volume: number, heightUI: number) => void
) {
  sliderDraggable(element, elementContainers, "vertical", callback);
}
