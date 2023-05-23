import express from "express";
import logger from "./utils/logger";
import { connectToDatabase, disconnectFromDatabase } from "./utils/database";
import cookieParser from "cookie-parser";
import cors from "cors";
import { CORS_ORIGIN } from "./constants";
import userRoute from './modules/user/user.route';
import authRoute from './modules/auth/auth.route';
import videoRoute from './modules/videos/video.route';
import deserializeUser from "./middleware/deserializeUser";


const PORT = process.env.PORT || 4000;

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true
  })
);
app.use(helmet());
app.use(deserializeUser);

app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/videos', videoRoute);

const server = app.listen(PORT, async () => {
  await connectToDatabase();
  logger.info("server listening on port " + PORT);
});

const signals = ["SIGTERM", "SIGINT"];

for (let i = 0; i < signals.length; i++) {
  gracefulShutdown(signals[i]);
}

function gracefulShutdown(signal: string) {
  process.on(signal, async () => {
    logger.info("server closed");
    server.close();
    await disconnectFromDatabase();
    process.exit(0);
  });
}
function helmet(): any {
  throw new Error("Function not implemented.");
}
