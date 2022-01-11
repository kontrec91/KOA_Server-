import { db, collectionInDBUsers } from "../db.js";

export async function userLogin(ctx) {
  const usersInDB = await db.collection(collectionInDBUsers).find(ctx.request.body).toArray();
  if (!usersInDB.length) {
    ctx.response.status = 401;
    ctx.body = { message: "Status 401: Not found" };
  } else {
    ctx.response.status = 200;
    ctx.body = { message: "Status 200: OK" };
  }
}
