import Koa from 'koa';
import KoaRouter from '@koa/router';
import bodyParser  from 'koa-bodyparser';

import { getToDoList } from "./db.js";
import { setToDoItem } from "./db.js";
import { createUser } from "./db.js";
import { checkUser } from "./db.js";
import main from "./db.js";


const hostname = "127.0.0.1";
const port = 3000;

const app = new Koa();
const router = new KoaRouter();
app.use(bodyParser());//as middleware

const collectionInDBTodos = "ToDoCollectionTodos";
const collectionInDBUsers = "ToDoCollectionUser";

main();

router.get('/get-data', async (ctx) => {
  await getToDoList(collectionInDBTodos, ctx, ctx.request.query.user_id);
})

router.post('/add-data', async (ctx) => {
  await setToDoItem(ctx.request.body, collectionInDBTodos, ctx);
})

router.post('/reg', async (ctx) => {
  await createUser(ctx.request.body, collectionInDBUsers, ctx);
})

router.post('/login', async (ctx) => {
  await checkUser(ctx.request.body, collectionInDBUsers, collectionInDBTodos, ctx);
})

app.use(router.routes()).use(router.allowedMethods());


app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});