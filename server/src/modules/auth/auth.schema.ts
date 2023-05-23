import { object, string, TypeOf } from "zod";

export const loginSchema = {
  body: object({
    email: string({
      required_error: "email required"
    }).email("not a valid email address"),
    password: string({
      required_error: "password required"
    })
      .min(6, "password must be at least 6 characters")
      .max(64, "password must be at least 64 characters short")
  })
};

export type LoginBody = TypeOf<typeof loginSchema.body>;
