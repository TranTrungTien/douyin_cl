const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.join(__dirname, "..", "..", "config.env") });

const { Schema } = require("mongoose");
const { writeFile } = require("fs");

const likedSchema = new mongoose.Schema(
  {
    author_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    video_id: {
      type: Schema.Types.ObjectId,
      ref: "Video",
    },
  },
  { timestamps: true, validateBeforeSave: true }
);

const LikedModel = mongoose.model("Liked", likedSchema);

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar_larger: {
      url_list: {
        type: [String],
        default: [],
      },
    },
    avatar_thumb: {
      url_list: {
        type: [String],
        default: [],
      },
    },
    cover_url: {
      url_list: {
        type: [String],
        default: [],
      },
    },
    favoriting_count: {
      type: Number,
      default: 0,
    },
    follower_count: {
      type: Number,
      default: 0,
    },
    follower_request_status: {
      type: Number,
      default: 0,
    },
    following_count: {
      type: Number,
      default: 0,
    },
    ip_location: {
      type: String,
      default: "",
    },
    is_blocked: {
      type: Boolean,
      default: false,
    },
    is_effect_artist: {
      type: Boolean,
      default: false,
    },
    is_gov_media_vip: {
      type: Boolean,
      default: false,
    },
    nickname: {
      type: String,
      required: true,
    },
    original_musician: {
      music_count: {
        type: Number,
        default: 0,
      },
    },
    share_info: {
      share_desc: {
        type: String,
        default: "",
      },
      share_image_url: {
        url_list: {
          type: [String],
          default: [],
        },
      },
      share_url: {
        type: String,
        default: "",
      },
    },
    show_favorite_list: {
      type: Boolean,
      default: false,
    },
    signature: {
      type: String,
      default: "",
    },
    signature_language: {
      type: String,
      default: "",
    },
    total_favorited: {
      type: Number,
      default: 0,
    },
    uid: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, validateBeforeSave: true }
);

const UserModel = mongoose.model("User", userSchema);

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
    deleteVideo: {
      type: Boolean,
      default: false,
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
const commentSchema = new mongoose.Schema(
  {
    author_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    video_id: {
      type: Schema.Types.ObjectId,
      ref: "Video",
    },
    reply_comment_id: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
    like_count: {
      type: Number,
      default: 0,
    },
    text: {
      type: String,
      default: "",
    },
    reply_count: {
      type: Number,
      default: 0,
    },
    delete_comment: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, validateBeforeSave: true }
);

const CommentModel = mongoose.model("Comment", commentSchema);

const DBConnect = () => {
  return new Promise((resolve, reject) => {
    mongoose.connect(
      "mongodb+srv://trantrungtien:Matkhau12345@cluster0.mlapa.mongodb.net/douyin?retryWrites=true&w=majority",
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

const findData = () => {
  const videoPs = new Promise((resolve, reject) => {
    VideoModel.find({}, (err, list) => {
      if (err) console;
      else {
        const videoIDs = list.map((video) => video._id);
        resolve(videoIDs);
      }
    });
  });
  const userPs = new Promise((resolve, reject) => {
    UserModel.find({}, (err, list) => {
      if (err) console;
      else {
        const userIDs = list.map((video) => video._id);
        resolve(userIDs);
      }
    });
  });
  const likedPs = new Promise((resolve, reject) => {
    LikedModel.find({}, (err, list) => {
      if (err) console;
      else {
        resolve(list);
      }
    });
  });
  const commentPs = new Promise((resolve, reject) => {
    CommentModel.find({}, (err, list) => {
      if (err) console;
      else {
        resolve(list);
      }
    });
  });
  return Promise.all([videoPs, commentPs, userPs, likedPs]);
};

let t = 0;

DBConnect().then((_) => {
  findData().then((data) => {
    const [videoPs, commentPs, userPs, likedPs] = data;
    const d = [];
    for (let i = 1; i < userPs.length - 1; i++) {
      const row = [];
      for (let j = 0; j < videoPs.length; j++) {
        let totalScore = 0;
        for (let k = 0; k < likedPs.length; k++) {
          if (
            likedPs[k]?.author_id?.toString() === userPs[i].toString() &&
            likedPs[k]?.video_id?.toString() === videoPs[j].toString()
          ) {
            ++totalScore;
            break;
          }
        }
        for (let k = 0; k < commentPs.length; k++) {
          if (
            commentPs[k]?.author_id?.toString() === userPs[i].toString() &&
            commentPs[k]?.video_id?.toString() === videoPs[j].toString()
          ) {
            ++t;
            console.log({ t });
            ++totalScore;
            break;
          }
        }
        row.push(totalScore);
      }
      d.push(row);
    }
    writeFile("train.json", JSON.stringify(d), (err) => console.log(err));
  });
});
