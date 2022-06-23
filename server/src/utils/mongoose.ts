import mongoose, { ConnectOptions } from "mongoose";
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(__dirname, "..", "..", "config.env") });

export const DBConnect = (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    mongoose.connect(
      process.env.MONGOOSE_URI as string,
      { useNewUrlParser: true, useUnifiedTopology: true } as ConnectOptions,
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
