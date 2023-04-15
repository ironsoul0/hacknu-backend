import express, { response } from "express";
import payload from "payload";
import axios from "axios";
import qs from "qs";
require("dotenv").config();

const app = express();

axios.defaults.baseURL = "https://localhost:3000";

app.get("/", (_, res) => {
  res.redirect("/admin");
});

async function sendTokenRequest() {
  const response = await axios.post(
    "http://hakaton-idp.gov4c.kz/auth/realms/con-web/protocol/openid-connect/token",
    new URLSearchParams({
      username: "test-operator",
      password: "DjrsmA9RMXRl",
      client_id: "cw-queue-service",
      grant_type: "password",
    })
  );

  return response.data.access_token;
}

async function sendSms(text: string, phone: string, token: string) {
  await axios.post(
    "http://hak-sms123.gov4c.kz/api/smsgateway/send",
    {
      phone,
      smsText: text,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

app.get("/send-sms", async function (req, res) {
  const token = await sendTokenRequest();
  const text = String(req.query.text) || "";
  const phone = String(req.query.phone) || "";
  sendSms(text, phone, token);
  return res.json({ text, phone });
});

// app.use(express.json());

// const body = {
//   headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
// };
// const res = axios.post("http://hak-sms123.gov4c.kz/api/smsgateway/send");

const start = async () => {
  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    mongoURL: process.env.MONGODB_URI,
    express: app,
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
    },
  });

  app.listen(process.env.PORT);
};

start();
