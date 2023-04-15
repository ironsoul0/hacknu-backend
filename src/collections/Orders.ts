import { CollectionConfig } from "payload/types";
import { serviceOptions } from "./CourierUsers";

const statusOptions = [
  {
    label: "Не взято в доставку",
    value: "stale",
  },
  {
    label: "Доставляется",
    value: "progress",
  },
  {
    label: "Доставлено",
    value: "delivered",
  },
];

const Orders: CollectionConfig = {
  slug: "orders",
  admin: {
    useAsTitle: "id",
    defaultColumns: [
      "id",
      "fullName",
      "fullDependantName",
      "fullAddress",
      "deliveryService",
      "userIIN",
      "serviceName",
      "govAddress",
    ],
    group: "Content",
  },
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
  },
  fields: [
    {
      name: "id",
      label: "ID услуги",
      type: "text",
    },
    {
      name: "fullName",
      label: "Полное имя клиента",
      type: "text",
    },
    {
      name: "fullDependantName",
      label: "Полное имя доверенного лица",
      type: "text",
    },
    {
      name: "fullAddress",
      label: "Полный адрес",
      type: "text",
    },
    {
      name: "deliveryService",
      label: "Сервис доставки",
      type: "radio",
      options: serviceOptions,
    },
    {
      name: "userIIN",
      label: "ИИН клиента",
      type: "text",
    },
    {
      name: "serviceName",
      label: "Название услуги",
      type: "text",
    },
    {
      name: "govAddress",
      label: "Адрес ЦОН",
      type: "text",
    },
    {
      name: "userToCourierOTP",
      label: "OTP от клиента к курьеру",
      type: "text",
    },
    {
      name: "courierToGovOTP",
      label: "OTP от курьера к работницу ЦОНа",
      type: "text",
    },
    {
      name: "status",
      label: "Статус",
      type: "radio",
      options: statusOptions,
      defaultValue: "stale",
    },
    {
      name: "attachedCourier",
      label: "Курьер",
      type: "text",
    },
  ],
};

export default Orders;
