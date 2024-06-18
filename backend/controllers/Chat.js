import ChatModel from "../models/chatModel.js";

export const createChat = async (request, response) => {
	const newstuff = new ChatModel({
		members: [request.body.senderId, request.body.receiverId],
	});
	try {
		const responseult = await newstuff.save();
		response.status(200).json(responseult);
	} catch (error) {
		response.status(500).json(error);
	}
};

export const findChat = async (request, response) => {
	try {
		const finds = await ChatModel.findOne({
			members: { $all: [request.params.firstId, request.params.secondId] },
		});
		response.status(200).json(finds);
	} catch (err) {
		response.status(500).json(err);
	}
};

export const deleteChat = async (request, response) => {
	const idofuser = request.params.id;

	try {
		await ChatModel.findByIdAndDelete(idofuser);
		response.status(200).json("User Deleted!");
	} catch (err) {
		response.status(500).json(err);
	}
};

export const userChats = async (request, response) => {
	try {
		const results = await ChatModel.find({
			members: { $in: [request.params.userId] },
		});
		response.status(200).json(results);
	} catch (err) {
		response.status(500).json(err);
	}
};
