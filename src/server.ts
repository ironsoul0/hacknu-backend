import express from "express";
import payload from "payload";
import cors from "cors";

import { router } from "./routes";
import { router as orderRouter } from "./routes/order";

require("dotenv").config();

const app = express();

app.use(cors());

app.get("/", (_, res) => {
  res.redirect("/admin");
});

const start = async () => {
  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    mongoURL: process.env.MONGODB_URI,
    express: app,
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
    },
  });

  router.use(payload.authenticate);

  app.use(router);
  app.use(orderRouter);

  app.listen(process.env.PORT);
};

start();
