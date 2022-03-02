import "dotenv/config";
import jwt from "jsonwebtoken";
import { db, collectionInDBUsers } from '../db.js';
import { ObjectId } from "mongodb";
import "dotenv/config";

export const verifyToken = async (ctx, next) => {
    const { SECRET_KEY } = process.env;
    if (!ctx.headers.authorization) {
        ctx.status = 403;
        ctx.body = "Something went wrong";
    }
    const token = ctx.headers.authorization.split(" ")[1];
    try {
        jwt.verify(token, `${process.env.ACCESS_KEY}`);
        ctx.response.status = 200;
    }
    catch (e) {
        console.log("Token expired!!!!!!!!!!!!!!");
        ctx.response.status = 401;
        ctx.body = "Token expired";
    }
    await next();
};

export const refreshTokens = async (ctx, userID) => {
    const tokens = await createTokens(userID);
    ctx.response.status = 200;
    ctx.body = tokens;
};
export const createTokens = async (userID) => {
    if (typeof userID === "string") {
        const accesToken = jwt.sign({ _id: userID }, process.env.ACCESS_KEY, { expiresIn: "30s" });
        const refreshToken = jwt.sign({ _id: userID }, process.env.ACCESS_KEY, { expiresIn: "50s" });
        await db
            .collection(collectionInDBUsers)
            .updateOne({ _id: new ObjectId(userID) }, { $set: { refreshTocken: refreshToken } });
        return {
            accesToken: accesToken,
            refreshToken: refreshToken,
        };
    }
};
