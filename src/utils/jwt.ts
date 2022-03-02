import "dotenv/config";
import jwt from "jsonwebtoken";
import { db, collectionInDBUsers } from '../db';
import { ObjectId } from "mongodb";
import "dotenv/config";
import { ResponseGenerator, Tokens } from "./Types";

export const verifyToken = async (ctx: ResponseGenerator, next: () => void) => {
  const { SECRET_KEY } = process.env;
  if (!ctx.headers.authorization) {
    ctx.status = 403;
    ctx.body = "Something went wrong";
  }
  const token = ctx.headers.authorization.split(" ")[1];
  try {
    jwt.verify(token, `${process.env.ACCESS_KEY}`);
    ctx.response.status = 200;
  } catch (e) {
    console.log("Token expired!!!!!!!!!!!!!!");
    ctx.response.status = 401;
    ctx.body = "Token expired";
  }
  await next();
};

export const refreshTokens = async (ctx: ResponseGenerator, userID: string) => {
  const tokens: Tokens = await createTokens(userID);

  ctx.response.status = 200;
  ctx.body = tokens;
};

export const createTokens = async (userID: string) => {
  if (typeof userID === "string") {
    const accesToken: string = jwt.sign({ _id: userID }, process.env.ACCESS_KEY as string, { expiresIn: "30s" });
    const refreshToken: string = jwt.sign({ _id: userID }, process.env.ACCESS_KEY as string, { expiresIn: "50s" });

    await db
      .collection(collectionInDBUsers)
      .updateOne({ _id: new ObjectId(userID) }, { $set: { refreshTocken: refreshToken } });
    return {
      accesToken,
      refreshToken,
    };
  }
};
