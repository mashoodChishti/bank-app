import { z } from "zod";

const authSchema = (type: "sign-in" | "sign-up") =>
  z.object({
    firstName:
      type === "sign-in"
        ? z.string().min(2).max(50).optional()
        : z.string().min(2).max(50),
    lastName:
      type === "sign-in"
        ? z.string().min(2).max(50).optional()
        : z.string().min(2).max(50),
    address:
      type === "sign-in"
        ? z.string().min(2).max(50).optional()
        : z.string().min(2).max(50),

    city:
      type === "sign-in"
        ? z.string().min(2).max(100).optional()
        : z.string().min(2).max(100),
    state:
      type === "sign-in"
        ? z.string().min(2).max(50).optional()
        : z.string().min(2).max(50),
    postalCode:
      type === "sign-in"
        ? z.string().min(2).max(50).optional()
        : z.string().min(2).max(50),
    dateOfBirth:
      type === "sign-in"
        ? z.string().min(2).max(50).optional()
        : z.string().min(2).max(50),
    ssn:
      type === "sign-in"
        ? z.string().min(2).max(50).optional()
        : z.string().min(2).max(50),

    email: z.string().email(),
    password: z.string().min(3).max(50),
  });

export default authSchema;
