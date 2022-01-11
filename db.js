import { MongoClient, ObjectId } from "mongodb";

const dbName = "ToDoDatabase";
const uri = `mongodb://127.0.0.1:27017/${dbName}`;

export const collectionInDBTodos = "ToDoCollectionTodos";
export const collectionInDBUsers = "ToDoCollectionUser";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default async function main() {
  await client.connect();
}

export const db = client.db(dbName);

export async function isValidID(ctx, callback) {
  if (ObjectId.isValid(ctx.request.body.userId)) {
    await callback(ctx);
  } else {
    ctx.response.status = 404;
    ctx.body = { message: "Incorrect user data. Please check it" };
  }
}