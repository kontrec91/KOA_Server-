import { db, collectionInDBTodos } from "../db.js";
import jwt_decode from "jwt-decode";
export async function getToDoList(ctx) {
  if (ctx.response.status < 401 || ctx.response.status >= 200) {
    const encodedTocken = ctx.request.headers.authorization.split(" ")[1];
    const decodedTocken = jwt_decode(encodedTocken);
    const userToDoListArray = await db.collection(collectionInDBTodos).find({ userId: decodedTocken._id }).toArray();
    if (userToDoListArray.length) {
      ctx.body = userToDoListArray;
    }
  }
}