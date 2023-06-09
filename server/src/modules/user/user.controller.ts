import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { RegisterUserBody } from "./user.schema";
import { CreateUser } from "./user.service";

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
      return res.status(StatusCodes.CONFLICT).send("User already exists");
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
  }
}
