import Koa from "koa";
import KoaRouter from "@koa/router";
import bodyParser from "koa-bodyparser";
import cors from "@koa/cors";

import main from "./db.js";
import { getToDoList } from "./components/getToDoList.js";
import { setToDoItem } from "./components/setToDoItem.js";
import { userLogin } from "./components/userLogin.js";
import { userReg } from "./components/userReg.js";
import { switchAllUserToDo } from "./components/switchAllUserToDo.js";
import { deleteToDoItem } from "./components/deleteToDoItem.js";
import { changeToDoItem } from "./components/changeToDoItem.js";
import { checkToDoItem } from "./components/checkToDoItem.js";
import { clearCompletedToDo } from "./components/clearCompletedToDo.js";
import { verifyToken } from "./components/verifyToken.js";
import { refreshTokens } from "./components/createTokens.js";

const hostname = "127.0.0.1";
const port = 3001;

const app = new Koa();
const router = new KoaRouter();

app.use(bodyParser()); //as middleware
app.use(cors());

main();

app.use(router.routes()).use(router.allowedMethods());

router.get("/get-data", verifyToken, async (ctx) => {
  await getToDoList(ctx);
});

router.post("/switch-all", verifyToken, async (ctx) => {
  await switchAllUserToDo(ctx);
});

router.post("/add-data", verifyToken, async (ctx) => {
  await setToDoItem(ctx);
});

router.post("/change-data", verifyToken, async (ctx) => {
  await changeToDoItem(ctx);
});

router.post("/check-data", verifyToken, async (ctx) => {
  await checkToDoItem(ctx);
});

router.post("/delete-data", verifyToken, async (ctx) => {
  await deleteToDoItem(ctx);
});

router.post("/clear-completed", verifyToken, async (ctx) => {
  await clearCompletedToDo(ctx);
});

router.post("/reg", async (ctx) => {
  await userReg(ctx);
});

router.post("/login", async (ctx) => {
  await userLogin(ctx);
});

router.post("/refresh", async (ctx) => {
  await refreshTokens(ctx, ctx.request.body.userId);
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
