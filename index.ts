import express from "express";
import dotenv from "dotenv";
import fs from "fs";
import cors from "cors";

const envFile = `.env.${process.env.NODE_ENV || "development"}`;
if (fs.existsSync(envFile)) {
  dotenv.config({ path: envFile });
} else {
  console.error(`Environment file ${envFile} not found!`);
  process.exit(1);
}

import "./database/pg.db";
import routes from "./routes/index.routes";
import { error, success } from "./services/response.service";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/web", routes);

process.on("uncaughtException", (err: Error) => {
  error(`Uncaught Exception: ${err.message}`);
  process.exit(1);
});

process.on("unhandledRejection", (reason: unknown) => {
  const errorMessage =
    reason instanceof Error ? reason.stack || reason.message : String(reason);
  error(`Unhandled Rejection: ${errorMessage}`);
  process.exit(1);
});

const port = process.env.PORT;
app.listen(port, () => {
  success(true, `SERVER :: ${process.env.NODE_ENV} :: PORT: ${port}`);
});

export default app;
