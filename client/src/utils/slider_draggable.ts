function sliderDraggable(
  element: HTMLElement,
  elementContainers: HTMLElement,
  direction: "vertical" | "horizontal",
  callback?: (volume: number) => void
) {
  const containerBounds = elementContainers.getBoundingClientRect();
  function handleMove(e: PointerEvent) {
    const { pageX, pageY } = e;
    if (direction === "horizontal") {
      const offsetX = pageX - containerBounds.left;
      const width = containerBounds.width - offsetX;
      if (width >= containerBounds.width || width <= 0) return;
      callback && callback(offsetX);
      if (offsetX >= containerBounds.width - width || offsetX <= 0) return;
      element.style.setProperty("width", offsetX + "px");
    } else if (direction === "vertical") {
      const offsetY = pageY - containerBounds.top;
      const height = containerBounds.height - offsetY;
      if (height >= containerBounds.height || height <= 0) return;
      const volume = (offsetY / containerBounds.height) * 1;
      callback && callback(volume);
      element.style.setProperty("height", height + "px");
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
  callback?: (timeSeek: number) => void
) {
  sliderDraggable(element, elementContainers, "horizontal", callback);
}
export function sliderDraggableVertical(
  element: HTMLElement,
  elementContainers: HTMLElement,
  callback?: (volume: number) => void
) {
  sliderDraggable(element, elementContainers, "vertical", callback);
}
