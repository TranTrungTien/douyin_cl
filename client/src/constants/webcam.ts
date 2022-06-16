export const webcamConstraint = {
  audio: false,
  video: {
    frameRate: {
      ideal: 15,
      max: 30,
    },
    facingMode: "user",
    width: { min: 640, ideal: 1280, max: 1920 },
    height: { min: 480, ideal: 720, max: 1080 },
  },
};