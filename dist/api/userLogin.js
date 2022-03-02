import { db, collectionInDBUsers } from "../db.js";
import CryptoJS from "crypto-js";
import "dotenv/config";
import { createTokens } from "../utils/jwt.js";

export async function userLogin(ctx) {
  const decriptPass = CryptoJS.AES.decrypt(ctx.request.body.password, process.env.SECRET_KEY).toString(
    CryptoJS.enc.Utf8
  );
  console.log('decriptPass', decriptPass);
  const usersInDB = await db
    .collection(collectionInDBUsers)
    .find({
      email: ctx.request.body.email,
      password: decriptPass,
    })
    .toArray();
  if (!usersInDB.length) {
    ctx.response.status = 401;
    ctx.body = { message: "Status 401: Not found" };
  } else {
    const tokens = await createTokens(usersInDB[0]._id.toString());
    // const { accesToken, refreshToken } = await createTokens(usersInDB[0]._id.toString());
    // console.log("tokens in LOGIN", accesToken, "tokens in LOGIN", refreshToken);
    ctx.response.status = 200;
    ctx.body = { userID: usersInDB[0]._id, token: tokens };
  }
}
