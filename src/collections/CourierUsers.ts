import { CollectionConfig } from "payload/types";

export const serviceOptions = [
  {
    label: "Yandex",
    value: "yandex",
  },
  {
    label: "inDrive",
    value: "inDrive",
  },
  {
    label: "UwU",
    value: "uwu",
  },
];

const CourierUsers: CollectionConfig = {
  slug: "courier-users",
  auth: true,
  admin: {
    useAsTitle: "email",
  },
  access: {
    read: () => true,
    create: () => true,
  },
  fields: [
    {
      name: "phone",
      label: "Номер телефона",
      type: "text",
    },
    {
      name: "service",
      label: "Сервис доставки",
      type: "radio",
      options: serviceOptions,
    },
  ],
};

export default CourierUsers;
