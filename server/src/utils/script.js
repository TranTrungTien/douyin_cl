// const { join } = require("path");
// const ffmpeg = require("@ffmpeg-installer/ffmpeg");
// const { spawn } = require("child_process");
// const { readFileSync } = require("fs");
// function getInfo() {
//   const data = readFileSync(join(__dirname, "meta_data.json"), {
//     encoding: "utf8",
//   });
//   const dataObj = JSON.parse(data);
//   const desc =
//     Array.isArray(dataObj) &&
//     dataObj.map((video, index) => {
//       return { id: index, desc: video.desc };
//     });
//   return desc;
// }

// function createImage(name) {
//   const path = join(__dirname, `${name}.mp4`);
//   const output = join(__dirname, "cover", `${name}_cover.png`);

//   return new Promise((resolve, reject) => {
//     const ffmpegP = spawn(ffmpeg.path, [
//       "-ss",
//       "00:00:02",
//       "-i",
//       path,
//       "-frames:v",
//       "1",
//       "-q:v",
//       "2",
//       output,
//     ]);
//     ffmpegP.on("close", (code) => {
//       console.log("code :", code);
//       resolve(code);
//     });
//     ffmpegP.on("error", (err) => {
//       console.log(err);
//       reject(err);
//     });
//   });
// }

// const fs = require("fs");

// // const readFile = () => {
// //   const buff = Buffer.alloc(1024);
// //   fs.open(__dirname + "/video_0.mp4", "r", function (err, fd) {
// //     fs.read(fd, buff, 0, 100, 0, function (err, bytesRead, buffer) {
// //       const start = buffer.indexOf(Buffer.from("mvhd")) + 17;
// //       const timeScale = buffer.readUInt32BE(start, 4);
// //       const duration = buffer.readUInt32BE(start + 4, 4);
// //       const movieLength = Math.floor(duration / timeScale);

// //       console.log("time scale: " + timeScale);
// //       console.log("duration: " + duration);
// //       console.log("movie length: " + movieLength + " seconds");
// //     });
// //   });
// // };

// // readFile();

// // generateFirstFrame();

// // video_id,
// //   caption : desc
// //   name: file.name,
// //             size: file.size,
// //             type: file.type,
// //             width: video.videoWidth,
// //             height: video.videoHeight,
// //             duration: video.duration,

// // const fs = require("fs").promises;

// // const buff = Buffer.alloc(1000);
// // const header = Buffer.from("mvhd");

// // async function main() {
// //   const file = await fs.open(__dirname + "/video_0.mp4", "r");
// //   const { buffer } = await file.read(buff, 0, 100, 0);

// //   await file.close();

// //   const start = buffer.indexOf(header) + 17;
// //   const timeScale = buffer.readUInt32BE(start);
// //   const duration = buffer.readUInt32BE(start + 4);

// //   const audioLength = Math.floor((duration / timeScale) * 1000) / 1000;
// //   console.log({ duration });
// //   console.log({ audioLength });
// // }

// // main();
