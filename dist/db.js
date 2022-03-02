import { MongoClient } from "mongodb";
const dbName = "ToDoDatabase";
const uri = `mongodb://127.0.0.1:27017/${dbName}`;
export const collectionInDBTodos = "ToDoCollectionTodos";
export const collectionInDBUsers = "ToDoCollectionUser";
const client = new MongoClient(uri, {
    // @ts-ignore
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
export default async function main() {
    await client.connect();
}
export const db = client.db(dbName);
