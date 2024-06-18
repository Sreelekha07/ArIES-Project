import React from "react";
import Comment from "../../images/comment.png";
import HomeOutlined from "@ant-design/icons/HomeOutlined";
import { Link } from "react-router-dom";

const TopNavigation = () => {
  return (
    <div className="TopNavigation" style={{ marginBottom: "22px", width : "100%" }}>
      <Link to="../home" style={{ textDecoration: "none" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "13px",
            textDecoration: "none",
            fontWeight: "bold",
            color: "black",
          }}
        >
          <HomeOutlined style={{ fontSize: "25px" }} />
          <span style={{ textDecoration: "none" }}>Home</span>
        </div>
      </Link>
      <Link to="../chat" style={{ textDecoration: "none" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "13px",
            textDecoration: "none",
            fontWeight: "bold",
            color: "black",
          }}
        >
          <img src={Comment} alt="" />
          <span>Chats</span>
        </div>
      </Link>
    </div>
  );
};

export default TopNavigation;
