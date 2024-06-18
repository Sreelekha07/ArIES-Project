import React from "react";
import PostPanel from "../../components/PostPanel/PostPanel";
import UserProfileCard from "../../components/UserProfileCard/UserProfileCard";
import LeftColumn from "../../components/LeftColumn/LeftColumn";
import RightColumn from "../../components/RightColumn/RightColumn";
import "./ProfilePage.styles.css";
const ProfilePage = () => {
	return (
		<div className="ProfilePage">
			<LeftColumn />
			<div className="ProfilePage-center">
				<UserProfileCard location="profilePage" />
				<PostPanel />
			</div>
			<RightColumn />
		</div>
	);
};

export default ProfilePage;
