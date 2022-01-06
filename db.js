import koaBodyparser from "koa-bodyparser";
import { MongoClient } from "mongodb";

const dbName = "ToDoDatabase";
const uri = `mongodb://127.0.0.1:27017/${dbName}`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default async function main() {
  await client.connect();
}

const db = client.db(dbName);

export const option = { id: "user_id" };

export async function getToDoList(collectionInDB, ctx = undefined, userID) {
  const userToDoListArray = await db
    .collection(collectionInDB)
    .find({ userId: userID })
    .toArray();
  if (userID && userToDoListArray.length) {
    ctx.body = userToDoListArray;
  } else if (userID && !userToDoListArray.length) {
    ctx.body = "User haven`t any data yet";
  } else {
    ctx.body = "Please registered or log in";
  }
}

export async function setToDoItem(body, collectionInDB, ctx) {
    body.userId = option.id;
    await db.collection(collectionInDB).insertOne(body); 
    await getToDoList(collectionInDB, ctx, option.id);
}

export async function createUser(body, collectionInDB, ctx) {
  await db.collection(collectionInDB).insertOne(body); 
  ctx.body = body;
}

export async function checkUser(body, collectionInDBUsers, collectionInDBTodos, ctx) {
  const usersInDB = await db.collection(collectionInDBUsers).find(body).toArray();
  if (!usersInDB.length) {
    ctx.body = "Status 400: Not found"
  } else {
    option.id = usersInDB[0]._id.toString();
    await getToDoList(collectionInDBTodos, ctx, usersInDB[0]._id.toString());
  }
}
