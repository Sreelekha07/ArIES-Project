import React from "react";
import "./UserProfileCard.styles.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const UserProfileCard = ({ location }) => {
	const { user } = useSelector((state) => state.authReducer.authData);
	const posts = useSelector((state) => state.postReducer.posts);
	const publicServer = process.env.REACT_APP_PUBLIC_FOLDER;
	return (
		<div className="UserProfileCard">
			<div className="ProfileImages">
				<img
					src={
						user.coverPicture
							? publicServer + user.coverPicture
							: publicServer + "defaultCover.jpg"
					}
					alt="CoverImage"
				/>
				<img
					src={
						user.profilePicture
							? publicServer + user.profilePicture
							: publicServer + "defaultProfile.png"
					}
					alt="ProfileImage"
				/>
			</div>
			<div className="ProfileName">
				<span>
					{user.firstname} {user.lastname}
				</span>
				<span>
					{user.worksAt ? user.worksAt : "Write about yourself"}
				</span>
			</div>

			<div className="followStatus">
				<hr />
				<div>
					<div className="follow">
						<span>{user.followers.length}</span>
						<span>Followers</span>
					</div>
					<div className="vl"></div>
					<div className="follow">
						<span>{user.following.length}</span>
						<span>Following</span>
					</div>

					{location === "profilePage" && (
						<>
							<div className="vl"></div>
							<div className="follow">
								<span>
									{
										posts.filter(
											(post) => post.userId === user._id
										).length
									}
								</span>
								<span>Posts</span>
							</div>{" "}
						</>
					)}
				</div>
				<hr />
			</div>

			{location === "profilePage" ? (
				""
			) : (
				<span>
					<Link
						to={`/profile/${user._id}`}
						style={{ textDecoration: "none", color: "inherit" }}
					>
						My Profile
					</Link>
				</span>
			)}
		</div>
	);
};

export default UserProfileCard;
