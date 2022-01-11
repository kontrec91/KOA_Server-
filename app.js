import Koa from "koa";
import KoaRouter from "@koa/router";
import bodyParser from "koa-bodyparser";

import main, { isValidID } from "./db.js";
import { getToDoList } from "./components/getToDoList.js";
import { setToDoItem } from "./components/setToDoItem.js";
import { userLogin } from "./components/userLogin.js";
import { userReg } from "./components/userReg.js";

const hostname = "127.0.0.1";
const port = 3000;

const app = new Koa();
const router = new KoaRouter();
app.use(bodyParser()); //as middleware

main();

app.use(router.routes()).use(router.allowedMethods());

router.get("/get-data", async (ctx) => {
  await getToDoList(ctx);
});

router.post("/add-data", async (ctx) => {
  await isValidID(ctx, setToDoItem);
});

router.post("/reg", async (ctx) => {
  await userReg(ctx);
});

router.post("/login", async (ctx) => {
  await userLogin(ctx);
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
