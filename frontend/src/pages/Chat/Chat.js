import React, { useRef, useState } from "react";
import ChatPanel from "../../components/ChatPanel/ChatPanel";
import Chats from "../../components/Chats/Chats";
import TopNavigation from "../../components/TopNavigation/TopNavigation";
import "./Chat.styles.css";
import { useEffect } from "react";
import { userChats } from "../../api/Chat";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import Logo from "../../images/logo.svg";

const Chat = () => {
  const dispatch = useDispatch();
  const socket = useRef();
  const { user } = useSelector((state) => state.authReducer.authData);

  const [chats, setChats] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);

  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await userChats(user._id);
        setChats(data);
      } catch (error) {
      }
    };
    getChats();
  }, [user._id]);

  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  useEffect(() => {
    socket.current = io("ws://localhost:8800");
    socket.current.emit("new-user-add", user._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  useEffect(() => {
    socket.current.on("recieve-message", (data) => {
      setReceivedMessage(data);
    });
  }, []);

  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== user._id);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };

  return (
    <div className="Chat">
      <div className="Left-side-chat">
        <div className="LogoSearch">
          <img style={{ width: "60px" }} src={Logo} alt="" />
          <p>Social Nest</p>
        </div>
        <div className="Chat-container">
          <h2>Chats</h2>
          <div className="Chat-list">
            {chats.map((chat) => (
              <div>
                <div
                  onClick={() => {
                    setCurrentChat(chat);
                  }}
                >
                  <Chats
                    data={chat}
                    currentUser={user._id}
                    online={checkOnlineStatus(chat)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="Right-side-chat">
        <div style={{ alignSelf: "flex-end" }}>
          <TopNavigation />
        </div>
        <ChatPanel
          chat={currentChat}
          currentUser={user._id}
          setSendMessage={setSendMessage}
          receivedMessage={receivedMessage}
          setCurrentChat={setCurrentChat}
          chats={chats}
          setChats={setChats}
        />
      </div>
    </div>
  );
};

export default Chat;
