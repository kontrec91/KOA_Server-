import { db, collectionInDBUsers, collectionInDBTodos } from "../db.js";
import { ObjectId } from "mongodb";

export async function setToDoItem(ctx) {
  const id = new ObjectId(ctx.request.body.userId);
  const currentUser = await db.collection(collectionInDBUsers).find({ _id: id }).toArray();
  if (currentUser.length && currentUser[0]._id.toString() === ctx.request.body.userId) {
    await db.collection(collectionInDBTodos).insertOne(ctx.request.body);
    ctx.response.status = 201;
    ctx.body = { message: "Status 201: OK" };
  } else {
    ctx.body = { message: "Status 404: Not Found" };
    ctx.response.status = 404;
  }
}
