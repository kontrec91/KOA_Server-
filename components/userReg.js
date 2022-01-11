import { db, collectionInDBUsers } from "../db.js";

export async function userReg(ctx) {
  const userEmail = ctx.request.body.email;
  const userInDB = await db.collection(collectionInDBUsers).find({ email: userEmail }).toArray();
  if (!userInDB.length) {
    await db.collection(collectionInDBUsers).insertOne(ctx.request.body);
    ctx.response.status = 201;
    ctx.body = ctx.request.body;
  } else {
    ctx.response.status = 401;
    ctx.body = { message: "User is alredy registered. Please log in" };
  }
}
