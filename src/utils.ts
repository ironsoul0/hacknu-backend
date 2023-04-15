import type { Request } from "express";
import axios from "axios";

import { TokenDetails } from "./config";

export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export type User = {
  id: string;
  email: string;
  collection: string;
  phone: string;
};

export const getUser = (req: Request): User | null => {
  type CustomRequest = Request & { user: User };
  const user = (req as CustomRequest).user as User;
  return user;
};

export const sendSms = async (text: string, phone: string) => {
  const {
    data: { access_token: token },
  } = await axios.post(
    TokenDetails.url,
    new URLSearchParams(TokenDetails.formData)
  );

  await axios.post(
    TokenDetails.smsUrl,
    {
      phone,
      smsText: text,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
