//ref : https://gist.github.com/Johnz86/afa34e519c2f169a1bb0ddba1fe419cf

interface DocumentWithFullscreen extends Document {
  fullscreenElement: Element;
  mozFullScreenElement: Element;
  msFullscreenElement: Element;
  webkitFullscreenElement: Element;
  exitFullscreen: () => Promise<void>;
  msExitFullscreen?: () => Promise<void>;
  mozCancelFullScreen?: () => Promise<void>;
  webkitExitFullscreen?: () => Promise<void>;
}

export function isFullScreen(): boolean {
  const doc = document as DocumentWithFullscreen;
  return !!(
    doc.fullscreenElement ||
    doc.mozFullScreenElement ||
    doc.webkitFullscreenElement ||
    doc.msFullscreenElement
  );
}

interface DocumentElementWithFullscreen extends HTMLElement {
  msRequestFullscreen?: () => void;
  mozRequestFullScreen?: () => void;
  webkitRequestFullscreen?: () => void;
}

function requestFullScreen(element: DocumentElementWithFullscreen) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  }
}

function exitFullScreen() {
  const doc = document as DocumentWithFullscreen;
  if (doc.exitFullscreen) {
    doc.exitFullscreen();
  } else if (doc.msExitFullscreen) {
    doc.msExitFullscreen();
  } else if (doc.webkitExitFullscreen) {
    doc.webkitExitFullscreen();
  } else if (doc.mozCancelFullScreen) {
    doc.mozCancelFullScreen();
  }
}

export function toggleFullScreen(player: HTMLElement): void {
  if (isFullScreen()) {
    exitFullScreen();
  } else {
    requestFullScreen(player);
  }
}
