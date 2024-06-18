import express from "express";
import {
	createChat,
	deleteChat,
	findChat,
	userChats,
} from "../controllers/Chat.js";
const router = express.Router();

router.post("/", createChat);
router.get("/find/:firstId/:secondId", findChat);
router.delete("/:id", deleteChat);
router.get("/:userId", userChats);

export default router;
