import { db, collectionInDBTodos } from "../db.js";
import { verifyToken } from "./verifyToken.js";
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";

export async function changeToDoItem(ctx) {
  if (ctx.response.status < 401 || ctx.response.status >= 200) {
    const itemTodoId = new ObjectId(ctx.request.body.itemTodoId);
    await db
      .collection(collectionInDBTodos)
      .updateOne({ _id: itemTodoId }, { $set: { todoValue: ctx.request.body.itemTodoValue } });
  }
}
