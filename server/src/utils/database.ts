import mongoose, { mongo } from "mongoose";
import logger from "./logger";
import env from "./validateEnv";

export async function connectToDatabase() {
  try {
    await mongoose.connect(env.MONGO_CONNECTION_STRING);
    logger.info("connect to database");
  } catch (err) {
    logger.error(err, "failed to connect to database");
    process.exit(1);
  }
}

export async function disconnectFromDatabase() {
  await mongoose.connection.close();
  logger.info("disconnect from database");
  return;
}
