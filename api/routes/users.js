import express from "express";
import { getProfile, getUser, updateProfile } from "../controllers/user.js";

const router = express.Router();

router.get("/", getProfile)
router.get("/:username", getUser)
router.put("/:id", updateProfile);

export default router;