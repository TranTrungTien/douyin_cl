import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(__dirname, "..", "..", "config.env") });

export const verifyRefreshToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const refreshToken = req.cookies.refreshToken as string;
  console.log({ refreshToken });

  if (!refreshToken) {
    res.status(401).send({ error: "Access Denied, RefreshToken needed" });
  } else {
    const user = jwt.verify(refreshToken, process.env.JWT_SECRET as string) as {
      _id: string;
    };
    if (user) {
      req.body._id = user._id;
      return next();
    } else {
      return res
        .status(401)
        .send({ error: "Access Denied, RefreshToken expired" });
    }
  }
};
