import express from "express";
import {
  findVideosHandler,
  streamVideoHandler,
  updatevideoHandler,
  uploadVideoHandler
} from "./video.controller";
import requireUser from "../../middleware/requireUser";

const router = express.Router();

router.post("/", requireUser, uploadVideoHandler);

router.patch("/:videoId", requireUser, updatevideoHandler);

router.get("/:videoId", requireUser, streamVideoHandler);

router.get("/", findVideosHandler);

export default router;
