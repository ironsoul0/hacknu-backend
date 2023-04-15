import express from "express";
import payload from "payload";

import { Collections, Messages, OrderStatus } from "../config";
import { getUser, generateOTP, sendSms } from "../utils";

const router = express.Router();

router.post("/api/take-from-pool", async (req, res) => {
  const user = getUser(req);

  if (!user || user.collection !== Collections.COURIER_USERS) {
    return res.status(401).json({
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

  const otp = generateOTP();

  const result = await payload.update({
    collection: Collections.ORDERS,
    id: orderId,
    data: {
      status: OrderStatus.COURIER_SELECTED,
      attachedCourier: courier.id,
      userToCourierOTP: otp,
    },
  });

  res.json(result);
});

router.post("/api/send-otp-to-courier", async (req, res) => {
  const user = getUser(req);

  if (!user || user.collection !== Collections.GOV_USERS) {
    return res.status(401).json({
      message: "Unauthorized request",
    });
  }

  const { orderId } = req.body;

  const orderDocs = await payload.find({
    where: {
      id: { equals: orderId },
    },
    collection: Collections.ORDERS,
  });

  if (
    !orderDocs.docs.length ||
    orderDocs.docs[0].status !== OrderStatus.COURIER_SELECTED
  ) {
    return res.status(401).json({
      message: "Invalid order ID was sent",
    });
  }

  const targetCourier = await payload.findByID({
    id: orderDocs.docs[0].attachedCourier,
    collection: Collections.COURIER_USERS,
  });

  const otp = generateOTP();
  const result = await payload.update({
    collection: Collections.ORDERS,
    id: orderId,
    data: {
      courierToGovOTP: otp,
    },
  });

  await sendSms(
    Messages.SENT_OTP_TO_COURIER.replace("{{otp}}", otp),
    targetCourier.phone
  );

  res.json(result);
});

router.post("/api/courier-pick-up", async (req, res) => {
  const user = getUser(req);

  if (!user || user.collection !== Collections.GOV_USERS) {
    return res.status(401).json({
      message: "Unauthorized request",
    });
  }

  const { orderId, otp } = req.body;

  const orderDocs = await payload.find({
    where: {
      id: { equals: orderId },
    },
    collection: Collections.ORDERS,
  });

  if (
    !orderDocs.docs.length ||
    orderDocs.docs[0].status !== OrderStatus.COURIER_SELECTED ||
    otp !== orderDocs.docs[0].courierToGovOTP
  ) {
    return res.status(401).json({
      message: "Invalid order ID or OTP was sent",
    });
  }

  const order = orderDocs.docs[0];
  const result = await payload.update({
    collection: Collections.ORDERS,
    id: orderId,
    data: {
      status: OrderStatus.COURIER_PICKED_UP,
    },
  });

  await sendSms(
    Messages.ORDER_PICKED_UP.replace("{{name}}", order.fullName)
      .replace("{{orderId}}", order.id)
      .replace("{{otp}}", order.userToCourierOTP),
    order.phone
  );

  res.json(result);
});

router.post("/api/complete-delivery", async (req, res) => {
  const user = getUser(req);

  if (!user || user.collection !== Collections.COURIER_USERS) {
    return res.status(401).json({
      message: "Unauthorized request",
    });
  }

  const { orderId, otp } = req.body;

  const orderDocs = await payload.find({
    where: {
      id: { equals: orderId },
    },
    collection: Collections.ORDERS,
  });

  if (
    !orderDocs.docs.length ||
    orderDocs.docs[0].status !== OrderStatus.COURIER_PICKED_UP ||
    otp !== orderDocs.docs[0].userToCourierOTP
  ) {
    return res.status(401).json({
      message: "Invalid order ID or OTP was sent",
    });
  }

  const order = orderDocs.docs[0];
  const result = await payload.update({
    collection: Collections.ORDERS,
    id: orderId,
    data: {
      status: OrderStatus.DELIVERED,
    },
  });

  await sendSms(
    Messages.DELIVERY_COMPLETED.replace("{{name}}", order.fullName).replace(
      "{{orderId}}",
      order.id
    ),
    order.phone
  );

  res.json(result);
});

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
