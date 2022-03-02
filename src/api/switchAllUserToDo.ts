import { db, collectionInDBTodos } from "../db.js";
import jwt_decode from "jwt-decode";
import { TokenType } from "../utils/Types.js";

export const switchAllUserToDo = async (ctx) => {
  if (ctx.response.status < 401 || ctx.response.status >= 200) {
    const encodedTocken: string = ctx.request.header.authorization.split(" ")[1];
    const decodedTocken: TokenType = jwt_decode(encodedTocken);
    // await db
    //   .collection(collectionInDBTodos)
    //   .updateMany({ userId: decodedTocken.userID }, { $set: { isChecked: ctx.request.body.isChecked } });

      await db
      .collection(collectionInDBTodos)
      .updateMany({ userId: decodedTocken._id }, { $set: { isChecked: ctx.request.body.isChecked } });
  }
};
