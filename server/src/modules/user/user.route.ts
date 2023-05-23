import express from "express";
import { registerUserHandler } from "./user.controller";
import { registerUserSchema } from "./user.schema";
import { processRequestBody } from "zod-express-middleware";
import requireUser from "../../middleware/requireUser";

const router = express.Router();

router.get("/", requireUser, (req, res) => {
  return res.send(res.locals.user);
});

router.post(
  "/",
  processRequestBody(registerUserSchema.body),
  registerUserHandler
);

export default router;
