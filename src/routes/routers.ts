import KoaRouter from "@koa/router";

import { getToDoList } from "../api/getToDoList";
import { setToDoItem } from "../api/setToDoItem";
import { userLogin } from "../api/userLogin";
import { userReg } from "../api/userReg";
import { switchAllUserToDo } from "../api/switchAllUserToDo";
import { deleteToDoItem } from "../api/deleteToDoItem";
import { changeToDoItem } from "../api/changeToDoItem";
import { checkToDoItem } from "../api/checkToDoItem";
import { clearCompletedToDo } from "../api/clearCompletedToDo";
import { verifyToken, refreshTokens } from '../utils/jwt';
// import { refreshTokens } from "./src/api/createTokens.js";
import { ResponseGenerator, Tokens } from "../utils/Types";


export const router = new KoaRouter();


export const getData = router.get("/get-data", verifyToken, async (ctx: ResponseGenerator) => {
  await getToDoList(ctx);
});

export const switchAll = router.post("/switch-all", verifyToken, async (ctx: ResponseGenerator) => {
  await switchAllUserToDo(ctx);
});

export const addData = router.post("/add-data", verifyToken, async(ctx: ResponseGenerator) => {
  await setToDoItem(ctx);
});

export const changeData = router.post("/change-data", verifyToken, async (ctx: ResponseGenerator) => {
  await changeToDoItem(ctx);
});

export const checkData = router.post("/check-data", verifyToken, async (ctx: ResponseGenerator) => {
  await checkToDoItem(ctx);
});

export const deleteData = router.post("/delete-data", verifyToken, async (ctx: ResponseGenerator) => {
  await deleteToDoItem(ctx);
});

export const clearCompleted = router.post("/clear-completed", verifyToken, async (ctx: ResponseGenerator) => {
  await clearCompletedToDo(ctx);
});

export const registration = router.post("/reg", async (ctx: ResponseGenerator) => {
  await userReg(ctx);
});

export const logIn = router.post("/login", async (ctx: ResponseGenerator) => {
  await userLogin(ctx);
});

export const refreshtokens = router.post("/refresh", async (ctx: ResponseGenerator) => {
  // export const refreshtokens = router.get("/refresh", async (ctx: ResponseGenerator) => {
  await refreshTokens(ctx, ctx.request.body.userId);
});
