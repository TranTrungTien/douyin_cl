import { Request, Response } from "express";
import { IUser } from "../interface/user.interface";
import UserModel from "../models/user.model";
// Disabled because installed error
// import bcrypt from "bcrypt";
import { v4 } from "uuid";
import jwt from "jsonwebtoken";
import NodeMailer from "nodemailer";
import LoginHelper from "../utils/login_helper";
import mongoose from "mongoose";

const loginHelper = new LoginHelper();

const createUser = async (req: Request, res: Response) => {
  // Disabled because installed error
  // const { password, ...user } = req.body.user as IUser;
  // bcrypt
  //   .hash(password, 15)
  //   .then((hashedPassword) => {
  //     const model = new UserModel({
  //       ...user,
  //       password: hashedPassword,
  //       uid: v4() + v4() + v4(),
  //     });
  //     model
  //       .save()
  //       .then((doc) => {
  //         console.log({ doc });
  //         res.status(201).send({ message: "Successfully", doc });
  //       })
  //       .catch((err) => {
  //         throw err;
  //       });
  //   })
  //   .catch((err) => res.status(500).send({ message: "Error", err }));
};
const updateUser = async (req: Request, res: Response) => {
  const user = req.body.user as IUser;
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const userDoc = await UserModel.findOneAndUpdate(
      { uid: user.uid },
      user
    ).exec();
    await session.commitTransaction();
    return res
      .status(200)
      .send({ message: "Updated Successfully", data: userDoc });
  } catch (error) {
    await session.abortTransaction();
    return res.status(500).send({ message: "Something went wrong", error });
  } finally {
    session.endSession();
  }
};
const getOwnInfo = async (req: Request, res: Response) => {
  const uid = req.body.uid;
  try {
    const userDoc = await UserModel.findOne(
      { uid: uid },
      { password: 0, createdAt: 0, updatedAt: 0, __v: 0 }
    ).exec();
    return res.status(200).send({ message: "Successfully", data: userDoc });
  } catch (error) {
    return res.status(500).send({ message: "Something went wrong", error });
  }
};

const getUserInfo = async (req: Request, res: Response) => {
  const uid = req.query.uid;
  try {
    const userDoc = await UserModel.findOne(
      { uid: uid },
      { password: 0, createdAt: 0, updatedAt: 0, __v: 0 }
    ).exec();
    return res.status(200).send({ message: "Successfully", data: userDoc });
  } catch (error) {
    return res.status(500).send({ message: "Something went wrong", error });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const uid = req.params.uid;
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const userDoc = await UserModel.findOneAndDelete(
      { uid: uid },
      { session }
    ).exec();
    await session.commitTransaction();
    return res.status(200).send({ message: "Successfully", data: userDoc });
  } catch (error) {
    await session.abortTransaction();
    return res.status(500).send({ message: "Something went wrong", error });
  } finally {
    session.endSession();
  }
};
const login = async (req: Request, res: Response) => {
  const email = req.body.email as string;
  const code = req.body.code as string;
  const password = req.body.password as string;
  if (!password && !email) {
    return res.status(400).send({ message: "Invalid email or password" });
  }
  loginHelper.deletePendingLogin(code, email);

  try {
    const userDoc = await UserModel.findOne({ email, password }).exec();
    if (userDoc) {
      const token = jwt.sign(
        { uid: userDoc.uid, _id: userDoc._id },
        process.env.JWT_SECRET ?? "",
        {
          expiresIn: "1d",
        }
      ) as string;
      const refreshToken = jwt.sign(
        { _id: userDoc._id },
        process.env.JWT_SECRET ?? "",
        {
          expiresIn: "30d",
        }
      ) as string;

      return res
        .status(200)
        .send({ message: "Successfully", data: userDoc, token, refreshToken });
    } else {
      return res.status(404).send({ message: "User not found" });
    }
  } catch (error) {
    return res.status(500).send({ message: "Something went wrong", error });
  }
};

const loginWithoutPassword = async (req: Request, res: Response) => {
  const email = req.body.email as string;
  const secretCode = req.body.secretCode as string;
  const codeVerified = loginHelper.findVerifiedCode(secretCode, email);

  if (codeVerified && secretCode) {
    loginHelper.deletePendingLogin(codeVerified.code, email);
    try {
      const userDoc = await UserModel.findOne(
        { email },
        { password: 0 }
      ).exec();
      if (userDoc) {
        const token = jwt.sign(
          { uid: userDoc.uid, _id: userDoc._id },
          process.env.JWT_SECRET ?? "",
          {
            expiresIn: "1d",
          }
        ) as string;
        const refreshToken = jwt.sign(
          { _id: userDoc._id },
          process.env.JWT_SECRET ?? "",
          {
            expiresIn: "30d",
          }
        ) as string;

        return res.status(200).send({
          message: "Successfully",
          data: userDoc,
          token,
          refreshToken,
        });
      } else {
        return res.status(404).send({ message: "User not found" });
      }
    } catch (error) {
      return res.status(500).send({ message: "Something went wrong", error });
    }
  }
};
const mailSender = async (req: Request, res: Response) => {
  const email = req.body.email as string;
  const user = await UserModel.findOne({ email: email });
  const code = v4();
  loginHelper.removeCode({ code, email });
  loginHelper.addNewCode({ code, email });
  // const transporter = NodeMailer.createTransport({
  //   service: "gmail",
  //   auth: {
  //     user: process.env.EMAIL_USERNAME,
  //     pass: process.env.EMAIL_PASSWORD,
  //   },
  // });

  console.log({ code });

  loginHelper.addNewExistedEmail({
    email: user ? email : null,
    isExisted: user ? true : false,
    code: code,
  });

  // transporter.sendMail(
  //   {
  //     from: `"Tran Trung Tien 👻" <${process.env.EMAIL_USERNAME}>`,
  //     to: email,
  //     subject: "Douyin Code", // Subject line
  //     text: "YourCode : " + code, // plain text body
  //   },
  //   (err, _) => {
  //     if (err) {
  //       return res.status(500).send({ message: "Error", err });
  //     } else {
  //       return res.status(200).send({ message: "Successfully", email });
  //     }
  //   }
  // );
  return res.status(200).send({ message: "Successfully", email });
};

const verifyCode = async (req: Request, res: Response) => {
  const clientCode = req.body.code as string;
  const existedEmail = req.body.existedEmail as string;
  const serverCode = loginHelper.findCode(clientCode, existedEmail);
  const isExisted = loginHelper.findExistedEmail(existedEmail);

  if (serverCode?.code === clientCode && existedEmail === serverCode.email) {
    const secretCode = v4() + v4() + v4() + v4();
    loginHelper.addVerifyCode({
      email: existedEmail,
      code: clientCode,
      verifyCode: secretCode,
    });
    return res.status(200).send({
      message: "Successfully",
      userExisted: existedEmail === isExisted?.email && isExisted.isExisted,
      userEmail: existedEmail,
      code: isExisted ? isExisted.code : null,
      secretCode:
        existedEmail === isExisted?.email && isExisted.isExisted
          ? secretCode
          : null,
    });
  } else
    return res.status(400).send({ message: "Error Code", isVerify: false });
};

const refreshToken = async (req: Request, res: Response) => {
  const userID = req.body._id as string;
  try {
    const userDoc = await UserModel.findById(userID).exec();
    if (userDoc) {
      const token = jwt.sign(
        { uid: userDoc.uid, _id: userDoc._id },
        process.env.JWT_SECRET ?? "",
        {
          expiresIn: "1d",
        }
      ) as string;
      return res.status(200).send({ message: "Successfully", newToken: token });
    }
  } catch (error) {
    return res.status(500).send({ message: "Something went wrong", error });
  }
};
const UserController = {
  createUser,
  updateUser,
  getUserInfo,
  getOwnInfo,
  deleteUser,
  login,
  mailSender,
  verifyCode,
  loginWithoutPassword,
  refreshToken,
};

export default UserController;
