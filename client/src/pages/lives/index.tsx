import React, { useEffect, useRef } from "react";
import { webcamConstraint } from "../../constants/webcam";
import { MediaRecorder } from "extendable-media-recorder";
const ws = new WebSocket("ws://127.0.0.1:3001");
// Connection opened
ws.addEventListener("open", (event) => {
  console.log("Connected ...");
});

ws.addEventListener("error", (err) => {
  console.log(err);
  ws.close();
});

// Listen for messages
// ws.addEventListener("message", function (event) {
//   if (event.data instanceof Blob)
//     event.data.arrayBuffer().then((arrayBuffer) => {
//       const unit8 = new Uint8Array(arrayBuffer);
//       console.log(String.fromCharCode.apply(String, unit8));
//     });
//   else console.log(event.data);
// });

const Lives = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  useEffect(() => {
    if (videoRef.current) {
      navigator.mediaDevices
        .getUserMedia(webcamConstraint)
        .then(function (mediaStream) {
          if (videoRef.current) {
            if ("srcObject" in videoRef.current) {
              videoRef.current.srcObject = mediaStream;
            }
            videoRef.current.onloadedmetadata = function (ev) {
              //show in the video element what is being captured by the webcam
              videoRef.current?.play();
            };

            //add listeners for saving video/audio
            const mediaRecorder = new MediaRecorder(mediaStream, {
              mimeType: MediaRecorder.isTypeSupported(
                "video/webm; codecs=avc1.4d002a"
              )
                ? "video/webm; codecs=avc1.4d002a"
                : "video/webm;codecs=h264",
            });
            const startBtn = document.querySelector(
              "#start"
            ) as HTMLButtonElement;
            const stopBtn = document.querySelector(
              "#stop"
            ) as HTMLButtonElement;
            startBtn.onclick = () => {
              mediaRecorder.start(0);
              console.log(mediaRecorder.state);
            };
            stopBtn.onclick = () => {
              mediaRecorder.stop();
              console.log(mediaRecorder.state);
            };
            // mediaRecorder.ondataavailable = (ev: any) => {
            //   // chunks.push(ev.data);
            //   ws.send(ev?.data);
            // };
            // mediaRecorder.onstop = (ev) => {
            //   let blob = new Blob(chunks, { type: "video/webm;codecs=h264" });
            //   chunks = [];
            //   let videoURL = window.URL.createObjectURL(blob);
            //   const link = document.createElement("a");
            //   link.href = videoURL;
            //   link.download = "video.webm";
            //   document.body.appendChild(link);
            //   link.click();
            // };
          }
        })
        .catch(function (err) {
          console.log(err.name, err.message);
        });
    }
  }, []);
  return (
    <div>
      <video ref={videoRef}></video>
      <button id="start">start</button>
      <button id="stop">end</button>
    </div>
  );
};

export default Lives;
