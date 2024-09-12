import { db, collectionInDBUsers } from "../db.js";
import jwt from "jsonwebtoken";
import CryptoJS from "crypto-js";
import 'dotenv/config';

export async function userReg(ctx) {
  const userEmail = ctx.request.body.email;

  const bytes = CryptoJS.AES.decrypt(ctx.request.body.password, process.env.SECRET_KEY);
  const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

  const userInDB = await db.collection(collectionInDBUsers).find({ email: userEmail }).toArray();
  if (!userInDB.length) {
    const currentUserId = await db.collection(collectionInDBUsers).insertOne({
      ...ctx.request.body,
      password: originalPassword,
    });
    const token = jwt.sign({ _id: currentUserId.insertedId.toString() }, process.env.ACCESS_KEY, { expiresIn: '30s' });//5 minutes
    ctx.response.status = 201;
    ctx.body = { token: token, data: ctx.request.body };
  } else {
    ctx.response.status = 401;
    ctx.body = { message: "User is alredy registered. Please log in" };
  }
}
