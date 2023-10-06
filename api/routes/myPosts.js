import express from "express";
import { getMyPosts } from "../controllers/myPost.js";

const router = express.Router();

router.get("/", getMyPosts)

export default router;