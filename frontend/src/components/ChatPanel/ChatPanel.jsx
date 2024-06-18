import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { addMessage, getMessages } from "../../api/Message";
import { getUser } from "../../api/User";
import "./ChatPanel.styles.css";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";
import { deletChat } from "../../api/Chat";

const ChatPanel = ({
	chat,
	currentUser,
	setSendMessage,
	receivedMessage,
	setCurrentChat,
	chats,
	setChats,
}) => {
	const [userData, setUserData] = useState(null);
	const [messages, setMessages] = useState([]);
	const [newMessage, setNewMessage] = useState("");

	const handleChange = (newMessage) => {
		setNewMessage(newMessage);
	};

	// fetching data for header
	useEffect(() => {
		const userId = chat?.members?.find((id) => id !== currentUser);
		const getUserData = async () => {
			try {
				const { data } = await getUser(userId);
				setUserData(data);
			} catch (error) {
			}
		};

		if (chat !== null) getUserData();
	}, [chat, currentUser]);

	useEffect(() => {
		const fetchMessages = async () => {
			try {
				const { data } = await getMessages(chat._id);
				setMessages(data);
			} catch (error) {
			}
		};

		if (chat !== null) fetchMessages();
	}, [chat]);

	useEffect(() => {
		scrollHandler.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	const handleSend = async (e) => {
		e.preventDefault();
		const message = {
			senderId: currentUser,
			text: newMessage,
			chatId: chat._id,
		};
		const receiverId = chat.members.find((id) => id !== currentUser);
		setSendMessage({ ...message, receiverId });
		try {
			const { data } = await addMessage(message);
			setMessages([...messages, data]);
			setNewMessage("");
		} catch{
		}
	};

	useEffect(() => {
		if (receivedMessage !== null && receivedMessage.chatId === chat._id) {
			setMessages([...messages, receivedMessage]);
		}
	}, [receivedMessage]);

	const scrollHandler = useRef();
	const imgRef = useRef();
	return (
		<>
			<div className="ChatPanel-container">
				{chat ? (
					<>
						<div className="chat-header">
							<div className="follower">
								<div>
									<img
										src={
											userData?.profilePicture
												? process.env
														.REACT_APP_PUBLIC_FOLDER +
												  userData.profilePicture
												: process.env
														.REACT_APP_PUBLIC_FOLDER +
												  "defaultProfile.png"
										}
										alt="Profile"
										className="followerImage"
										style={{
											width: "50px",
											height: "50px",
										}}
									/>
									<div
										className="name"
										style={{ fontSize: "0.9rem" }}
									>
										<span>
											{userData?.firstname}{" "}
											{userData?.lastname}
										</span>
									</div>
									<button
										className="button"
										style={{ paddingLeft: "10px" }}
										onClick={() => {
											deletChat(chat._id);
											setCurrentChat(null);
											setChats(
												chats.filter(
													(ch) => ch._id != chat._id
												)
											);
										}}
									>
										Delete
									</button>
								</div>
							</div>
							<hr
								style={{
									width: "95%",
									border: "0.1px solid #ececec",
									marginTop: "20px",
								}}
							/>
						</div>
						<div className="chat-body">
							{messages.map((message) => (
								<>
									<div
										ref={scrollHandler}
										className={
											message.senderId === currentUser
												? "message own"
												: "message"
										}
									>
										<span>{message.text}</span>{" "}
										<span>{format(message.createdAt)}</span>
									</div>
								</>
							))}
						</div>
						<div className="chat-sender">
							<div onClick={() => imgRef.current.click()}>
								+
							</div>
							<InputEmoji
								value={newMessage}
								onChange={handleChange}
							/>
							<div
								className="send-button button"
								onClick={handleSend}
							>
								Send
							</div>
							<input
								type="file"
								name=""
								id=""
								style={{ display: "none" }}
								ref={imgRef}
							/>
						</div>{" "}
					</>
				) : (
					<span className="ChatPanel-empty-message">
						Start a conversation by just tapping..
					</span>
				)}
			</div>
		</>
	);
};

export default ChatPanel;
