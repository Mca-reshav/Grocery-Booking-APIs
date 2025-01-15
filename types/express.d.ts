import { Request } from "express";

declare module "express-serve-static-core" {
  interface Request {
    headers: {
      authorization: '',
      user: {
        userId: string;
        role: string;
      };
    };
  }
}
