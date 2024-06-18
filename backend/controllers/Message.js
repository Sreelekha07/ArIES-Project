import MessageModel from "../models/messageModel.js";

export const getMessages = async (request, response) => {
  const { chatId } = request.params;
  try {
    const findings = await MessageModel.find({ chatId });
    response.status(200).json(findings);
  } catch (error) {
    response.status(500).json(error);
  }
};
export const addMessage = async (request, response) => {
  const { chatId, senderId, text } = request.body;
  const msg = new MessageModel({
    chatId,
    senderId,
    text,
  });
  try {
    const findings = await msg.save();
    response.status(200).json(findings);
  } catch (error) {
    response.status(500).json(error);
  }
};
