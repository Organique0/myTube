import mongoose, { mongo } from "mongoose";
import logger from "./logger";

const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING || "x";

export async function connectToDatabase() {
  try {
    await mongoose.connect(DB_CONNECTION_STRING);
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
