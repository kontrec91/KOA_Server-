import { db, collectionInDBTodos } from "../db.js";
import jwt_decode from "jwt-decode";
export async function clearCompletedToDo(ctx) {
    if (ctx.response.status < 401 || ctx.response.status >= 200) {
        const encodedTocken = ctx.headers.authorization.split(" ")[1];
        const decodedTocken = jwt_decode(encodedTocken);
        await db.collection(collectionInDBTodos).deleteMany({ isChecked: true, userId: decodedTocken._id });
    }
}
