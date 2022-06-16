import mongoose, { ConnectOptions } from "mongoose";
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(__dirname, "..", "..", "config.env") });

export const DBConnect = () => {
  try {
    mongoose.connect(
      process.env.MONGOOSE_URI as string,
      { useNewUrlParser: true, useUnifiedTopology: true } as ConnectOptions,
      (error) => {
        if (error) {
          console.log({ error });
          process.exit(-1);
        } else {
          console.log("Connect to MongoDb Successfully");
        }
      }
    );
  } catch (error) {
    console.log({ error });
    process.exit(-1);
  }
};
