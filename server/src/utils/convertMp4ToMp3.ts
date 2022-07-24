import ffmpegBinary from "@ffmpeg-installer/ffmpeg";
import { spawn } from "child_process";
import internal from "stream";
import { musicPath } from "../const/path";

export const convertMp4ToMp3 = (filePosition: string, name: string) => {
  return new Promise<number | null>((resolve, reject) => {
    const ffmpeg = spawn(ffmpegBinary.path, [
      "-i",
      filePosition,
      "-q:a",
      "0",
      "-map",
      "a",
      name,
    ]);
    ffmpeg.on("close", (code) => resolve(code));
    ffmpeg.on("error", (err) => reject(err));
  });
};

//musicPath + `/${name}_music.mp3`,
