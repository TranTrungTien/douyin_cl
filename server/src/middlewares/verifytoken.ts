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
  if (!token) {
    res.status(401).send({ error: "Access Denied, Token needed" });
  } else {
    const user = jwt.verify(token, process.env.JWT_SECRET as string) as {
      _id: string;
    };
    if (user) {
      req.user = user;
      return next();
    } else {
      return res.status(401).send({ error: "Access Denied, Token expired" });
    }
  }
};
