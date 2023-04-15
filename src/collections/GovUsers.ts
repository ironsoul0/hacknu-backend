import { CollectionConfig } from "payload/types";

const GovUsers: CollectionConfig = {
  slug: "gov-users",
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
  ],
};

export default GovUsers;
