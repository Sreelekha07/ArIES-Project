import PostModel from "../models/postModel.js";
import UserModel from "../models/userModel.js";
import mongoose from "mongoose";

export const createPost = async (request, response) => {
	const createdPost = new PostModel(request.body);

	try {
		await createdPost.save();
		response.status(200).json(createdPost);
	} catch (error) {
		response.status(500).json(error);
	}
};

export const deletePost = async (request, response) => {
	const id = request.params.id;
	const { userId } = request.body;

	try {
		const foundpost = await PostModel.findById(id);
		if (foundpost.userId === userId) {
			await foundpost.deleteOne();
			response.status(200).json("removed!");
		} else {
			response.status(403).json("no permission");
		}
	} catch (error) {
		response.status(500).json(error);
	}
};

export const likePost = async (request, response) => {
	const idofuser = request.params.id;
	const { userId } = request.body;
	try {
		const foundpost = await PostModel.findById(idofuser);
		if (foundpost.likes.includes(userId)) {
			await foundpost.updateOne({ $pull: { likes: userId } });
			response.status(200).json("removed like");
		} else {
			await foundpost.updateOne({ $push: { likes: userId } });
			response.status(200).json("like added");
		}
	} catch (error) {
		response.status(500).json(error);
	}
};

export const addComment = async (request, response) => {
	const idofuser = request.params.id;
	const { userId, content } = request.body;

	try {
		const foundpost = await PostModel.findById(idofuser);
		await foundpost.updateOne({
			$push: { comments: { userId: userId, content: content } },
		});
		response.status(200).json("comment created");
	} catch (error) {
		response.status(500).json(error);
	}
};

export const getPost = async (request, response) => {
	const idofuser = request.params.id;

	try {
		const foundpost = await PostModel.findById(idofuser);
		response.status(200).json(foundpost);
	} catch (error) {
		response.status(500).json(error);
	}
};

export const updatePost = async (request, response) => {
	const foundpostId = request.params.id;
	const { userId } = request.body;

	try {
		const foundpost = await PostModel.findById(foundpostId);
		if (post.userId === userId) {
			await foundpost.updateOne({ $set: request.body });
			response.status(200).json("Post changed succesfully!");
		} else {
			response.status(403).json("unable to process");
		}
	} catch (error) {}
};

export const getTimelinePosts = async (request, response) => {
	const Id = request.params.id;
	try {
		const newCurrentuserposts = await PostModel.find({ userId: Id });

		const followingPosts = await UserModel.aggregate([
			{
				$match: {
					_id: new mongoose.Types.ObjectId(Id),
				},
			},
			{
				$lookup: {
					from: "posts",
					localField: "following",
					foreignField: "userId",
					as: "followingPosts",
				},
			},
			{
				$project: {
					followingPosts: 1,
					_id: 0,
				},
			},
		]);

		response.status(200).json(
			newCurrentuserposts
				.concat(...followingPosts[0].followingPosts)
				.sort((a, b) => {
					return new Date(b.createdAt) - new Date(a.createdAt);
				})
		);
	} catch (error) {
		response.status(500).json(error);
	}
};
