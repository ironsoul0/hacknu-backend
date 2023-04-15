import { CollectionConfig } from "payload/types";

const GovUsers: CollectionConfig = {
  slug: "gov-users",
  auth: true,
  admin: {
    useAsTitle: "email",
  },
  access: {
    read: () => true,
  },
  fields: [],
};

export default GovUsers;
