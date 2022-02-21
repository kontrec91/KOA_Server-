import { db, collectionInDBTodos } from "../db.js";
import jwt_decode from "jwt-decode";

export const switchAllUserToDo = async (ctx) => {
  if (ctx.response.status < 401 || ctx.response.status >= 200) {
    const encodedTocken = ctx.request.header.authorization.split(" ")[1];
    const decodedTocken = jwt_decode(encodedTocken);
    await db
      .collection(collectionInDBTodos)
      .updateMany({ userId: decodedTocken.userID }, { $set: { isChecked: ctx.request.body.isChecked } });
  }
};
