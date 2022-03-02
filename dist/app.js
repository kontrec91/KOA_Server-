import Koa from "koa";
// import KoaRouter from "@koa/router";
import bodyParser from "koa-bodyparser";
import cors from "@koa/cors";
import main from "./db.js";
import { HOSTNAME, PORT } from "./utils/constants.js";
import * as routers from "./routes/routers.js";


// import { getToDoList } from "./api/getToDoList.js";
// import { setToDoItem } from "./api/setToDoItem.js";
// import { userLogin } from "./api/userLogin.js";
// import { userReg } from "./api/userReg.js";
// import { switchAllUserToDo } from "./api/switchAllUserToDo.js";
// import { deleteToDoItem } from "./api/deleteToDoItem.js";
// import { changeToDoItem } from "./api/changeToDoItem.js";
// import { checkToDoItem } from "./api/checkToDoItem.js";
// import { clearCompletedToDo } from "./api/clearCompletedToDo.js";
// import { verifyToken, refreshTokens } from './utils/jwt.js';



// import {router, getData} from "./routes/routers.js";


const app = new Koa();
// const router = new KoaRouter();

app.use(bodyParser());
app.use(cors());
main();
app.use(routers.router.routes()).use(routers.router.allowedMethods());

routers.getData();    
routers.addData();    
routers.changeData();   
routers.checkData();   
routers.deleteData();   
routers.logIn();         
routers.registration();  
routers.switchAll();        
routers.clearCompleted();   
routers.refreshtokens();  

// getData();


// router.get("/get-data", verifyToken, async (ctx) => {
//     await getToDoList(ctx);
// });
//  router.post("/switch-all", verifyToken, async (ctx) => {
//     await switchAllUserToDo(ctx);
// });
// router.post("/add-data", verifyToken, async (ctx) => {
//     await setToDoItem(ctx);
// });
// router.post("/change-data", verifyToken, async (ctx) => {
//     await changeToDoItem(ctx);
// });
// router.post("/check-data", verifyToken, async (ctx) => {
//     await checkToDoItem(ctx);
// });
// router.post("/delete-data", verifyToken, async (ctx) => {
//     await deleteToDoItem(ctx);
// });
// router.post("/clear-completed", verifyToken, async (ctx) => {
//     await clearCompletedToDo(ctx);
// });
// router.post("/reg", async (ctx) => {
//     await userReg(ctx);
// });
// router.post("/login", async (ctx) => {
//     await userLogin(ctx);
// });
// router.post("/refresh", async (ctx) => {
//     await refreshTokens(ctx, ctx.request.body.userId);
// });


app.listen(PORT, HOSTNAME, () => {
    console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});
