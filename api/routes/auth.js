import express from "express";
import multer from "multer";
import { register, login, logout } from "../controllers/auth.js";

const router = express.Router();
const upload = multer();

router.post("/register", upload.none(), register);
router.post("/login", login);
router.post("/logout", logout);

export default router;
