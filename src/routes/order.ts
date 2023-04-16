import { Router } from "express";
import payload from "payload";

import { Collections, Messages } from "../config";
import { sendSms } from "../utils";

const router = Router();

router.post("/api/create-order", async (req, res) => {
  const orderDocs = await payload.find({
    where: {
      id: { equals: req.body.id },
    },
    collection: Collections.ORDERS,
  });

  if (orderDocs.docs.length !== 0) {
    return res.status(401).json({
      message: "Order with this ID already exists",
    });
  }

  const user = await payload.create({
    collection: Collections.ORDERS,
    data: req.body,
  });

  await sendSms(
    Messages.ORDER_RECEVIED.replace("{{name}}", req.body.fullName),
    req.body.phone
  );

  res.json(user);
});

export { router };
