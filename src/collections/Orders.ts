import { CollectionConfig } from "payload/types";
import { serviceOptions } from "./CourierUsers";

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
  fields: [
    {
      name: "id",
      label: "ID",
      type: "text",
    },
    {
      name: "fullName",
      type: "text",
    },
    {
      name: "fullDependantName",
      type: "text",
    },
    {
      name: "fullAddress",
      type: "text",
    },
    {
      name: "deliveryService",
      type: "radio",
      options: serviceOptions,
    },
    {
      name: "userIIN",
      label: "User IIN",
      type: "text",
    },
    {
      name: "serviceName",
      type: "text",
    },
    {
      name: "govAddress",
      type: "text",
    },
  ],
};

export default Orders;
