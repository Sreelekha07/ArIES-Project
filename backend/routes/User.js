import express from "express";
import {
	deleteUser,
	followUser,
	getAllUsers,
	getUser,
	unfollowUser,
	updateUser,
} from "../controllers/User.js";
import authMiddleWare from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.get("/:id", getUser);
router.delete("/:id", authMiddleWare, deleteUser);
router.put("/:id/follow", authMiddleWare, followUser);
router.put("/:id/unfollow", authMiddleWare, unfollowUser);
router.get("/", getAllUsers);
router.put("/:id", authMiddleWare, updateUser);

export default router;
