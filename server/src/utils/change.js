const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.join(__dirname, "..", "..", "config.env") });

const videoSchema = new mongoose.Schema(
  {
    id_f: {
      type: String,
      required: true,
    },
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    mimeType: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    allow_user_do: {
      comment: {
        type: Boolean,
        default: true,
      },
      duet: {
        type: Boolean,
        default: true,
      },
      stich: {
        type: Boolean,
        default: true,
      },
    },
    who_can_view: {
      type: String,
      default: "Public",
    },
    play_addr: {
      url_list: {
        type: [String],
        default: [],
      },
    },
    origin_cover: {
      url_list: {
        type: [String],
        default: [],
      },
    },
    desc: {
      type: String,
      default: "",
    },
    author_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    music_id: {
      type: Schema.Types.ObjectId,
      ref: "Music",
    },
  },
  {
    timestamps: true,
    validateBeforeSave: true,
  }
);

const VideoModel = mongoose.model("Video", videoSchema);

const DBConnect = () => {
  return new Promise((resolve, reject) => {
    mongoose.connect(
      "mongodb+srv://trantrungtien:Matkhau12345@cluster0.mlapa.mongodb.net/douyin?retryWrites=true&w=majority",
      // @ts-ignore
      { useNewUrlParser: true, useUnifiedTopology: true },
      (error) => {
        if (error) {
          console.log({ error });
          reject(error);
        } else {
          console.log("Connect to MongoDb Successfully");
          resolve(true);
        }
      }
    );
  });
};

DBConnect().then((_) => {
  VideoModel.find({}, null, null, (err, list) => {
    if (err) console.log({ err });
    else {
      list.forEach((item) => {
        const url = item.origin_cover.url_list[0].split("/").slice(3).join("/");
        VideoModel.findByIdAndUpdate(
          item._id,
          {
            origin_cover: {
              url_list: [url],
            },
          },
          null,
          (err, result) => {
            if (err) console.log({ err });
            else console.log("done");
          }
        );
      });
    }
  });
});
