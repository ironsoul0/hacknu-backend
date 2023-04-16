export enum Collections {
  COURIER_USERS = "courier-users",
  GOV_USERS = "gov-users",
  ORDERS = "orders",
  ADMINS = "admins",
}

export enum OrderStatus {
  STALE = "stale",
  COURIER_SELECTED = "courierSelected",
  COURIER_PICKED_UP = "courierPickedUp",
  DELIVERED = "delivered",
}

export const TokenDetails = {
  url: "http://hakaton-idp.gov4c.kz/auth/realms/con-web/protocol/openid-connect/token",
  smsUrl: "http://hak-sms123.gov4c.kz/api/smsgateway/send",
  formData: {
    username: "test-operator",
    password: "DjrsmA9RMXRl",
    client_id: "cw-queue-service",
    grant_type: "password",
  },
};

export enum Messages {
  ORDER_RECEVIED = "Уважемый {{name}}, Ваш заказ принят! Мы сообщим Вам, когда Ваш заказ будет подобран курьером.",
  ORDER_PICKED_UP = "Уважаемый {{name}}, cообщаем, что Ваша заявка №{{orderId}} была подобрана курьером. Сообщите данный код курьеру: {{otp}} по его приезду.",
  DELIVERY_COMPLETED = "Уважаемый {{name}}, сообщаем, что Ваша заявка №{{orderId}} была доставлена. Спасибо за использование нашего сервиса.",
  SENT_OTP_TO_COURIER = "Уважаемый курьер, сообщите данный OTP работнику ЦОНа для получения заказа: {{otp}}.",
  COURIER_CHANGED = "Уважаемый клиент, курьер отказался от Вашего заказа. Мы сообщим Вам, когда Ваш заказ будет подобран новым курьером.",
}
