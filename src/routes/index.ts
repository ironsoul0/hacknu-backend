import type { Express, Request } from "express";
import express from "express";
import payload from "payload";

import { Collections, OrderStatus } from "../config";

const router = express.Router();

type User = {
  id: string;
  email: string;
  collection: string;
};

const getUser = (req: Request): User | null => {
  type CustomRequest = Request & { user: User };
  const user = (req as CustomRequest).user as User;
  return user;
};

router.post("/api/take-from-pool", async (req, res) => {
  const user = getUser(req);

  if (!user || user.collection !== Collections.COURIER_USERS) {
    return res.json(401).json({
      message: "Unauthorized request",
    });
  }

  const orderId = req.body.orderId;

  const courier = await payload.findByID({
    id: user.id,
    collection: Collections.COURIER_USERS,
  });
  const orderDocs = await payload.find({
    where: {
      id: { equals: orderId },
    },
    collection: Collections.ORDERS,
  });

  if (
    !orderDocs.docs.length ||
    orderDocs.docs[0].status !== OrderStatus.STALE
  ) {
    return res.status(401).json({
      message: "Invalid order ID was sent",
    });
  }

  const result = await payload.update({
    collection: Collections.ORDERS,
    id: orderId,
    data: {
      status: OrderStatus.IN_PROGRESS,
      attachedCourier: courier.id,
    },
  });

  res.json(result);
});

export { router };
