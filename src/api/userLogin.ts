import { db, collectionInDBUsers } from "../db";
import CryptoJS from "crypto-js";
import "dotenv/config";
import { createTokens } from "../utils/jwt";
import { Tokens } from "../utils/Types";

export async function userLogin(ctx) {
  console.log('data in userLogin', ctx.request.body);
  const decriptPass = CryptoJS.AES.decrypt(ctx.request.body.password, process.env.SECRET_KEY as string).toString(
    CryptoJS.enc.Utf8
    );
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

    const tokens: Tokens = await createTokens(usersInDB[0]._id.toString());

    // const { accesToken, refreshToken } = await createTokens(usersInDB[0]._id.toString());
    // console.log("tokens in LOGIN", accesToken, "tokens in LOGIN", refreshToken);
    ctx.response.status = 200;
    ctx.body = { userID: usersInDB[0]._id, token: tokens };
  }
}
