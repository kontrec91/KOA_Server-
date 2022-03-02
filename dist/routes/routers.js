import KoaRouter from "@koa/router";
import { getToDoList } from "../api/getToDoList.js";
import { setToDoItem } from "../api/setToDoItem.js";
import { userLogin } from "../api/userLogin.js";
import { userReg } from "../api/userReg.js";
import { switchAllUserToDo } from "../api/switchAllUserToDo.js";
import { deleteToDoItem } from "../api/deleteToDoItem.js";
import { changeToDoItem } from "../api/changeToDoItem.js";
import { checkToDoItem } from "../api/checkToDoItem.js";
import { clearCompletedToDo } from "../api/clearCompletedToDo.js";
import { verifyToken, refreshTokens } from "../utils/jwt.js";

export const router = new KoaRouter();

export const getData = () =>
  router.get("/get-data", verifyToken, async (ctx) => {
    await getToDoList(ctx);
  });
export const switchAll = () =>
  router.post("/switch-all", verifyToken, async (ctx) => {
    await switchAllUserToDo(ctx);
  });
export const addData = () =>
  router.post("/add-data", verifyToken, async (ctx) => {
    await setToDoItem(ctx);
  });
export const changeData = () =>
  router.post("/change-data", verifyToken, async (ctx) => {
    await changeToDoItem(ctx);
  });
export const checkData = () =>
  router.post("/check-data", verifyToken, async (ctx) => {
    await checkToDoItem(ctx);
  });
export const deleteData = () =>
  router.post("/delete-data", verifyToken, async (ctx) => {
    await deleteToDoItem(ctx);
  });
export const clearCompleted = () =>
  router.post("/clear-completed", verifyToken, async (ctx) => {
    await clearCompletedToDo(ctx);
  });
export const registration = () =>
  router.post("/reg", async (ctx) => {
    await userReg(ctx);
  });
export const logIn = () =>
  router.post("/login", async (ctx) => {
    console.log('params in login', ctx.request.body);
    await userLogin(ctx);
  });
export const refreshtokens = () =>
  router.post("/refresh", async (ctx) => {
    await refreshTokens(ctx, ctx.request.body.userId);
  });
