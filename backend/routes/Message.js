import express from "express";
import { addMessage, getMessages } from "../controllers/Message.js";

const router = express.Router();

router.get("/:chatId", getMessages);
router.post("/", addMessage);

export default router;
