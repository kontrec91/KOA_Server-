import { db, collectionInDBTodos } from "../db.js";
export async function setToDoItem(ctx) {
  // if (ctx.response.status < 401 || ctx.response.status >= 200) {
  if (ctx.response.status !== 401) {
    await db.collection(collectionInDBTodos).insertOne(ctx.request.body.itemTodo);
    ctx.body = ctx.request.body.itemTodo;
  }
}
