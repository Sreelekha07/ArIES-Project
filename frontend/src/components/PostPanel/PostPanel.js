import React from "react";
import Posts from "../Posts/Posts";
import SharePost from "../SharePost/SharePost";
const PostPanel = () => {
	return (
		<div className="PostPanel">
			<SharePost />
			<Posts />
		</div>
	);
};

export default PostPanel;
