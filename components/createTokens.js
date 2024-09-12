import "dotenv/config";
import jwt from "jsonwebtoken";
import { db, collectionInDBUsers } from "../db.js";
import { ObjectId } from "mongodb";

export const refreshTokens = async (ctx, userID) => {
  const { accesToken, refreshToken } = await createTokens(ctx, userID);
  console.log("11111refreshToken1111", refreshToken, '2222222accesToken222222', accesToken);
  ctx.response.status = 200;
  ctx.body = {
    accesToken,
    refreshToken,
  };
};


export const createTokens = async (ctx, userID) => {
  if (typeof userID === "string") {
    const accesToken = jwt.sign({ _id: userID }, process.env.ACCESS_KEY, { expiresIn: "30s" }); //5 minutes
    const refreshToken = jwt.sign({ _id: userID }, process.env.ACCESS_KEY, { expiresIn: "50s" }); //5 minutes

    await db
      .collection(collectionInDBUsers)
      .updateOne({ _id: new ObjectId(userID) }, { $set: { refreshTocken: refreshToken } });
      return {
        accesToken,
        refreshToken,
      };
    // } else {
    //   const accesToken = jwt.sign({ _id: userID }, process.env.ACCESS_KEY, { expiresIn: "30s" }); //5 minutes
    //   const refreshToken = jwt.sign({ _id: userID }, process.env.ACCESS_KEY, { expiresIn: "50s" }); //5 minutes

    //   await db
    //     .collection(collectionInDBUsers)
    //     .updateOne({ _id: new ObjectId(userID.request.body.userId) }, { $set: { refreshTocken: refreshToken } });

    //     console.log("11111refreshToken1111", refreshToken, '2222222accesToken222222', accesToken);
    //     return {
    //     accesToken,
    //     refreshToken
    //   };
  }
};
