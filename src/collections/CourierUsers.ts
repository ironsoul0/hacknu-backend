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
  },
  fields: [
    {
      name: "service",
      type: "radio",
      options: serviceOptions,
    },
  ],
};

export default CourierUsers;
