import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { CreateUser } from "./user.service";
import { RegisterUserBody } from "./user.schema";

export async function registerUserHandler(
  req: Request<{}, {}, RegisterUserBody>,
  res: Response
) {
  const { username, email, password } = req.body;

  try {
    await CreateUser({ username, email, password });
    return res.status(StatusCodes.CREATED).send("user created successfully");
  } catch (error: any) {
    if (error.code === 11000) {
      res.status(StatusCodes.CONFLICT).send("User already exists");
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
  }
}
