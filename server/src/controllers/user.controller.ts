import { Request, Response } from "express";
import { IUser } from "../interface/user.interface";
import UserModel from "../models/user.model";
// Disabled because installed error
// import bcrypt from "bcrypt";
import { v4 } from "uuid";
import jwt from "jsonwebtoken";
import NodeMailer from "nodemailer";
import LoginHelper from "../utils/login_helper";

const loginHelper = new LoginHelper();

function createUser(req: Request, res: Response) {
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
}
function updateUser(req: Request, res: Response) {
  const user = req.body.user as IUser;
  UserModel.findOneAndUpdate({ uid: user.uid }, user, null, (err, doc) => {
    if (err) res.status(500).send({ message: "Error", err });
    else {
      if (!doc) return res.status(404).send({ message: "Not found" });
      res.status(200).send({ message: "Successfully", doc });
    }
  });
}
function getOwnInfo(req: Request, res: Response) {
  const uid = req.body.uid;
  UserModel.findOne(
    { uid: uid },
    { password: 0, createdAt: 0, updatedAt: 0, __v: 0 },
    null,
    (err, doc) => {
      if (err) res.status(500).send({ message: "Error", err });
      else {
        if (!doc) return res.status(404).send({ message: "Not found" });
        res.status(200).send({ message: "Successfully", doc });
      }
    }
  );
}

function getUserInfo(req: Request, res: Response) {
  const uid = req.query.uid;
  UserModel.findOne(
    { uid: uid },
    { password: 0, createdAt: 0, updatedAt: 0, __v: 0 },
    null,
    (err, doc) => {
      if (err) res.status(500).send({ message: "Error", err });
      else {
        if (!doc) return res.status(404).send({ message: "Not found" });
        res.status(200).send({ message: "Successfully", doc });
      }
    }
  );
}

function deleteUser(req: Request, res: Response) {
  const uid = req.params.uid;
  UserModel.findOneAndDelete({ uid: uid }, null, (err, doc) => {
    if (err) res.status(500).send({ message: "Error", err });
    else {
      if (!doc) return res.status(404).send({ message: "Not found" });
      res.status(200).send({ message: "Successfully", doc });
    }
  });
}
function login(req: Request, res: Response) {
  const email = req.body.email as string;
  const code = req.body.code as string;
  const password = req.body.password as string;
  if (!password && !email) {
    return res.status(400).send({ message: "Invalid email or password" });
  }
  loginHelper.deletePendingLogin(code, email);
  UserModel.findOne({ email, password }, null, null, (err, doc) => {
    if (err) return res.status(500).send(err);
    else {
      if (!doc) return res.status(404).send(doc);
      else {
        const token = jwt.sign(
          { uid: doc.uid, _id: doc._id },
          process.env.JWT_SECRET ?? ""
        ) as string;
        const date = new Date();
        return res
          .status(200)
          .cookie("token", token, {
            expires: new Date(date.getDate() + 24 * 60 * 60),
            httpOnly: true,
            sameSite: "none",
            secure: false,
          })
          .send({ message: "Successfully", doc });
      }
    }
  });
}

function loginWithoutPassword(req: Request, res: Response) {
  const email = req.body.email as string;
  const secretCode = req.body.secretCode as string;
  const codeVerified = loginHelper.findVerifiedCode(secretCode, email);

  if (codeVerified && secretCode) {
    loginHelper.deletePendingLogin(codeVerified.code, email);
    UserModel.findOne({ email }, { password: 0 }, null, (err, doc) => {
      if (err) return res.status(500).send(err);
      else {
        if (!doc) return res.status(404).send(doc);
        else {
          const token = jwt.sign(
            { uid: doc.uid, _id: doc._id },
            process.env.JWT_SECRET ?? ""
          ) as string;
          return res
            .status(200)
            .cookie("token", token, {
              expires: new Date(Date.now() + 3600000),
              httpOnly: true,
            })
            .send({ message: "Successfully", doc });
        }
      }
    });
  } else if (!codeVerified && !secretCode) {
    return res.status(400).send({ message: "Invalid email or secret code" });
  }
}
async function mailSender(req: Request, res: Response) {
  const email = req.body.email as string;
  const user = await UserModel.findOne({ email: email });
  const code = v4();
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
}

function verifyCode(req: Request, res: Response) {
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
}

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
};

export default UserController;
