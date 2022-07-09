import { Request, Response } from "express";
import { v4 } from "uuid";
import MusicModel from "../models/music.model";

function createMusic(req: Request, res: Response) {
  const music = new MusicModel({
    id: v4(),
    title: "",
    author_id: "",
    duration: 1,
    play_url: {
      url_list: [],
    },
  });
  music.save((err, doc) => {
    if (err) res.status(500).send({ message: "Error like video", error: err });
    else res.status(200).send({ message: "Successfully liked", doc });
  });
}

export default {
  createMusic,
};
