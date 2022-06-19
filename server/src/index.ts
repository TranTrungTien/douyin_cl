import cors from "cors";
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import http from "http";
import path from "path";
import MediaRouter from "./routers/media.route";
import RecommendationRouter from "./routers/recommendation.route";
import { RecommendationUtils } from "./utils/recommendation";

RecommendationUtils.train();
const app: Express = express();
// import WebSocket from "ws";
// import NodeMediaServer from "node-media-server";
// import ffmpegBinary from "@ffmpeg-installer/ffmpeg";
// import { spawn } from "child_process";

dotenv.config({ path: path.join(__dirname, "config.env") });
const PORT = process.env.PORT || 3001;
const server = http.createServer(app).listen(PORT, () => {
  console.log("server is running on port", PORT);
});

app.use(
  cors({
    origin: "*",
    methods: "*",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/media", MediaRouter);
app.use("/api/v1/recommendation", RecommendationRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("run on https ......");
});

// const wss = new WebSocket.Server({ server });

// const ffmpegOps = [
//   "-re",
//   "-i",
//   "-",
//   "-vcodec",
//   "copy",
//   "-acodec",
//   "copy",
//   "-preset",
//   "veryfast",
//   "-tune",
//   "zerolatency", // video codec config: low latency, adaptive bitrate
//   "-c:a",
//   "aac",
//   "-ar",
//   "44100",
//   "-b:a",
//   "128k", // audio codec config: sampling frequency (11025, 22050, 44100), bitrate 64 kbits
//   "-y", //force to overwrite
//   "-use_wallclock_as_timestamps",
//   "1", // used for audio sync
//   "-async",
//   "1", // used for audio sync
//   //'-filter_complex', 'aresample=44100', // resample audio to 44100Hz, needed if input is not 44100
//   //'-strict', 'experimental',
//   "-f",
//   "flv",
//   "rtmp://localhost/live/tran_trung_tien",
// ];

// wss.on("connection", function connection(ws) {
//   console.log("Connected ...");
//   ws.send("Welcome all of you to my app ....");
//   const ffmpeg = spawn(ffmpegBinary.path, ffmpegOps);

//   // If FFmpeg stops for any reason, close the WebSocket connection.
//   ffmpeg.on("close", (code, signal) => {
//     console.log(
//       "FFmpeg child process closed, code " + code + ", signal " + signal
//     );
//     ws.terminate();
//   });

//   ffmpeg.stdin.on("error", (e) => {
//     console.log("FFmpeg STDIN Error", e);
//   });

//   ffmpeg.stderr.on("data", (data) => {
//     console.log("FFmpeg STDERR:", data.toString());
//   });
//   ws.on("message", (data) => {
//     console.log("DATA", data);
//     ffmpeg.stdin.write(data);
//   });
//   ws.on("close", (e) => {
//     ffmpeg.kill("SIGINT");
//   });
// });

// const config = {
//   rtmp: {
//     port: 1935,
//     chunk_size: 60000,
//     gop_cache: true,
//     ping: 30,
//     ping_timeout: 60,
//   },
//   http: {
//     port: 8000,
//     allow_origin: "*",
//     mediaroot: "./media",
//   },
// };

// const nms = new NodeMediaServer(config);
// nms.run();
