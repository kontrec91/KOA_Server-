import Koa from "koa";
import bodyParser from "koa-bodyparser";
import cors from "@koa/cors";

import main from "./db";
import { router } from "./routes/routers";
import { HOSTNAME, PORT } from "./utils/constants";
import * as routers from "./routes/routers";

const app = new Koa();

app.use(bodyParser());
app.use(cors());

main();

app.use(router.routes()).use(router.allowedMethods());

routers.getData();

app.listen(PORT, HOSTNAME, () => {
  console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});
