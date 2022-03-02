import { db, collectionInDBTodos } from "../db.js";
import { ObjectId } from "mongodb";
export async function deleteToDoItem(ctx) {
    if (ctx.response.status < 401 || ctx.response.status >= 200) {
        const itemTodoId = new ObjectId(ctx.request.body.itemTodoId);
        await db.collection(collectionInDBTodos).deleteOne({ _id: itemTodoId });
        ctx.body = ctx.request.body.itemTodo;
    }
}
