import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(__dirname, "..", "..", "config.env") });

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token as string;
  console.log({ token });

  if (!token) {
    res.status(401).send({ error: "Access Denied, Token needed" });
  } else {
    const user = jwt.verify(token, process.env.JWT_SECRET as string) as {
      _id: string;
      uid: string;
    };
    if (user) {
      req.body.uid = user.uid;
      req.body._id = user._id;
      return next();
    } else {
      return res.status(401).send({ error: "Access Denied, Token expired" });
    }
  }
};
