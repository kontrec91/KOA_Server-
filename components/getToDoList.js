import { db, collectionInDBTodos } from "../db.js";

export async function getToDoList(ctx) {
  const userToDoListArray = await db
    .collection(collectionInDBTodos)
    .find({ userId: ctx.request.query.user_id })
    .toArray();

  if (userToDoListArray.length) {
    ctx.response.status = 200;
    ctx.body = userToDoListArray;
  } else {
    ctx.response.status = 404;
    ctx.body = { message: "Status 404: Not Found. User haven`t any data yet" };
  }
}
