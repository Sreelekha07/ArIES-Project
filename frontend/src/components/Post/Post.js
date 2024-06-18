import React, { useState } from "react";
import Comment from "../../images/comment.png";
import Share from "../../images/share.png";
import Heart from "../../images/like.png";
import NotLike from "../../images/notlike.png";
import { likePost } from "../../api/Posts";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../../actions/Actions.js";
import ReactPlayer from "react-player";

const Post = ({ data, postOwner, allUsers }) => {
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.authReducer.authData);
	const [liked, setLiked] = useState(data.likes.includes(user._id));
	const [likes, setLikes] = useState(data.likes.length);
	const [showCommentSection, setShowCommentSection] = useState(false);
	const [commentInput, setCommentInput] = useState("");
	const folderPublic = process.env.REACT_APP_PUBLIC_FOLDER;
	const publicServer = process.env.REACT_APP_PUBLIC_FOLDER;
	const handleLike = () => {
		likePost(data._id, user._id);
		setLiked((prev) => !prev);
		liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
	};
	return (
		<div className="Post" style={{marginBottom : "20px"}}>
			<div
				className="follower"
				style={{ justifyContent: "start", gap: "20px" }}
			>
				<img
					src={
						folderPublic + postOwner.profilePicture
							? folderPublic + postOwner.profilePicture
							: folderPublic + "defaultProfile.png"
					}
					alt="profile"
					className="followerImage"
				/>
				<div className="name">
					<span>{postOwner.firstname}</span>
					<span style={{ fontSize: "14px" }}>
						@{postOwner.username}
					</span>
				</div>
			</div>
			<div className="detail">
				<span>
					<b>{data.name} </b>
				</span>
				<span>{data.desc}</span>
			</div>
			<div
				style={{
					width: "100%",
					display: "flex",
					justifyContent: "center",
				}}
			>
				{data.image ? (
					data.image.includes("mp4") ? (
						<div>
							<ReactPlayer
								controls={true}
								url={
									process.env.REACT_APP_PUBLIC_FOLDER +
									data.image
								}
							/>
						</div>
					) : (
						<img
							className="user-post-image"
							src={
								data.image
									? process.env.REACT_APP_PUBLIC_FOLDER +
									  data.image
									: ""
							}
							alt=""
						/>
					)
				) : null}
			</div>

			<div>
				<span
					style={{
						color: "var(--gray)",
						fontSize: "12px",
						marginRight: "10px",
					}}
				>
					{likes} likes
				</span>
				<span style={{ color: "var(--gray)", fontSize: "12px" }}>
					{data.comments.length} comments
				</span>
			</div>
			<div className="postReact">
				<img
					src={liked ? Heart : NotLike}
					alt=""
					style={{ cursor: "pointer" }}
					onClick={handleLike}
				/>
				<img
					src={Comment}
					alt=""
					style={{ cursor: "pointer" }}
					onClick={() => {
						setShowCommentSection(!showCommentSection);
					}}
				/>
				<img src={Share} alt="" />
			</div>
			{showCommentSection ? (
				<React.Fragment>
					<div>
						<div style={{ fontWeight: "bold" }}>Comments</div>
					</div>
					{data.comments.map((comment, key) => {
						const commentOwner = allUsers.find(
							(us) => us._id === comment.userId
						);
						return (
							<div
								key={key}
								style={{
									display: "flex",
									flexDirection: "row",
									paddingLeft: "15px",
								}}
							>
								<img
									src={
										folderPublic +
										commentOwner.profilePicture
											? folderPublic +
											  commentOwner.profilePicture
											: folderPublic +
											  "defaultProfile.png"
									}
									alt="profile"
									style={{
										width: "2.3rem",
										height: "2.3rem",
										borderRadius: "50%",
									}}
								/>

								<div
									style={{
										borderBottom: "1 px solid var(--gray)",
										paddingLeft: "15px",
										paddingTop: "0px",
									}}
								>
									<div style={{ fontSize: "14px" }}>
										{commentOwner.firstname}{" "}
										{commentOwner.lastdream}
									</div>
									<span
										style={{
											color: "var(--gray)",
											fontSize: "12px",
										}}
									>
										@{commentOwner.username}
									</span>
									<div
										style={{
											fontSize: "15px",
											paddingTop: "7px",
										}}
									>
										{comment.content}
									</div>
								</div>
							</div>
						);
					})}
					<div className="SharePost" style={{ paddingLeft: "15px" }}>
						<img
							src={
								user.profilePicture
									? publicServer + user.profilePicture
									: publicServer + "defaultProfile.png"
							}
							alt="Profile"
							style={{
								width: "2.3rem",
								height: "2.3rem",
								borderRadius: "50%",
							}}
						/>
						<input
							type="text"
							placeholder="What's happening?"
							required
							style={{ width: "250px" }}
							value={commentInput}
							onChange={(event) => {
								setCommentInput(event.target.value);
							}}
						/>
						<button
							className="button ps-button"
							onClick={() => {
								dispatch(
									addComment(data._id, {
										userId: user._id,
										content: commentInput,
									})
								);
								setCommentInput("");
							}}
						>
							Send
						</button>
					</div>
				</React.Fragment>
			) : null}
		</div>
	);
};

export default Post;
