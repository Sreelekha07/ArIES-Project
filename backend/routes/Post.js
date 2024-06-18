import express from "express";
import {
	addComment,
	createPost,
	deletePost,
	getPost,
	getTimelinePosts,
	likePost,
	updatePost,
} from "../controllers/Post.js";
const router = express.Router();

router.post("/", createPost);
router.get("/:id", getPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);
router.put("/:id/comment", addComment);
router.put("/:id/like", likePost);
router.get("/:id/timeline", getTimelinePosts);

export default router;
