import { buildConfig } from "payload/config";
import path from "path";

import Admins from "./collections/Admins";
import CourierUsers from "./collections/CourierUsers";
import GovUsers from "./collections/GovUsers";
import Orders from "./collections/Orders";

export default buildConfig({
  serverURL: process.env.SERVER_URL,
  admin: {
    user: Admins.slug,
  },
  collections: [Admins, CourierUsers, GovUsers, Orders],
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
  },
});
