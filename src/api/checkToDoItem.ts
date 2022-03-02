import { db, collectionInDBTodos } from "../db";
import { ObjectId } from "mongodb";
import { ResponseGenerator, Tokens } from "../utils/Types";

export async function checkToDoItem(ctx: ResponseGenerator) {
  if (ctx.response.status < 401 || ctx.response.status >= 200) {
    const itemTodoId = new ObjectId(ctx.request.body.itemTodoId);
    const itemToDo = await db.collection(collectionInDBTodos).findOne({ _id: itemTodoId });
    await db
      .collection(collectionInDBTodos)
      .updateOne({ _id: itemTodoId }, { $set: { isChecked: !itemToDo!.isChecked } });
  }
}
