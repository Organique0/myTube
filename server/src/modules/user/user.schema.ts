import { object, string, TypeOf } from "zod";

export const registerUserSchema = {
  body: object({
    username: string({
      required_error: "username must be provided"
    }),
    email: string({
      required_error: "email must be provided"
    }).email("must be a valid email address"),
    password: string({
      required_error: "password must be provided"
    }).min(6, "Password must be at least 6 characters"),
    confirmPassword: string({
      required_error: "password does not match"
    })
  }).refine((data) => data.password === data.confirmPassword, {
    message: "password does not match",
    path: ["confirmPassword"]
  })
};

export type RegisterUserBody = TypeOf<typeof registerUserSchema.body>;
