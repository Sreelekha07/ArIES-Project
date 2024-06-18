import React from "react";
import PostPanel from "../components/PostPanel/PostPanel";
import RightColumn from "../components/RightColumn/RightColumn";
import "./HomePage.styles.css";
import LeftColumn from "../components/LeftColumn/LeftColumn";
const HomePage = () => {
  return (
    <div className="Home">
      <LeftColumn />
      <PostPanel />
      <RightColumn />
    </div>
  );
};

export default HomePage;
