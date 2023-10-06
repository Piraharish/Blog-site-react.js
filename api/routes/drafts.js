import express from "express";
import { addDraft, getDrafts, deleteDraft, updateDraft  } from "../controllers/draft.js";

const router = express.Router();

router.post("/", addDraft);
router.get("/", getDrafts);
router.delete("/:id", deleteDraft);
router.put("/:id", updateDraft);

export default router;
