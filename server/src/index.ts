import cors from "cors";
import { DBConnect } from "./utils/mongoose";
import { RecommendationUtils } from "./utils/recommendation";
import express, { Express, Request, Response } from "express";
import path from "path";
import dotenv from "dotenv";
import http from "http";
import cookieParser from "cookie-parser";
import RecommendationRouter from "./routers/recommendation.route";
import UserRouter from "./routers/user.route";
import MediaRouter from "./routers/media.route";
import StatisticsRouter from "./routers/statistics.route";
import MusicRouter from "./routers/music.route";
import LikeRouter from "./routers/liked.route";
import ShareRouter from "./routers/shared.route";
import CoverRouter from "./routers/cover.route";
import CommentRouter from "./routers/comment.route";
import LikedCommentRouter from "./routers/liked_comment.route";
import FollowingRouter from "./routers/following.route";

DBConnect()
  .then((_) => {
    RecommendationUtils.train()
      .then((done) => {
        console.log("trained : ", done);
        const app: Express = express();
        dotenv.config({ path: path.join(__dirname, "config.env") });
        const PORT = process.env.PORT || 3001;
        const server = http.createServer(app).listen(PORT, () => {
          console.log("server is running on port", PORT);
        });

        app.use(
          cors({
            origin: true,
            methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
            credentials: true,
          })
        );
        app.use(cookieParser());
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use("/api/v1/media", MediaRouter);
        app.use("/api/v1/user", UserRouter);
        app.use("/api/v1/recommendation", RecommendationRouter);
        app.use("/api/v1/statistics", StatisticsRouter);
        app.use("/api/v1/music", MusicRouter);
        app.use("/api/v1/user-actions", LikeRouter);
        app.use("/api/v1/image", CoverRouter);
        app.use("/api/v1/user-actions", ShareRouter);
        app.use("/api/v1/comment", CommentRouter);
        app.use("/api/v1/comment/liked-comments", LikedCommentRouter);
        app.use("/api/v1/following", FollowingRouter);

        app.get("/", (req: Request, res: Response) => {
          res.send("run on https ......");
        });
      })
      .catch((_) => {
        console.log("something went wrong !!!");
        process.exit(-1);
      });
  })
  .catch((err) => {
    console.log(err);

    process.exit(-1);
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
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// import * as Recommender from "likely";

// const matrix = [
//   [1, 1, 1, 1, 0, 1],
//   [1, 0, 1, 1, 0, 0],
//   [1, 0, 0, 0, 0, 1],
//   [0, 1, 1, 1, 0, 0],
//   [1, 1, 1, 1, 0, 1],
//   [1, 0, 0, 0, 1, 1],
// ];

// const rowLabels = ["John", "Sue", "Joe", "Smith", "Doe", "Hanna"];
// const colLabels = ["Red", "Blue", "Green", "Purple", "Yellow", "YellowGreen"];

// const model = Recommender.buildModel(matrix, rowLabels, colLabels);

// console.log(
//   model.recommendations(rowLabels[2]).sort((x: any[], y: any[]) => y[1] - x[1])
// );
