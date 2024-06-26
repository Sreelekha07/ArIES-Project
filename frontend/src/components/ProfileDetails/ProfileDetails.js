import React, { useEffect, useState } from "react";
import { UilPen } from "@iconscout/react-unicons";
import ProfileInfoCard from "../ProfileInfoCard/ProfileInfoCard.js";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as UserApi from "../../api/User.js";
import { logout } from "../../actions/Actions.js";

const ProfileDetails = () => {
	const dispatch = useDispatch();
	const params = useParams();
	const [modalOpened, setModalOpened] = useState(false);
	const profileUserId = params.id;
	const [profileUser, setProfileUser] = useState({});
	const { user } = useSelector((state) => state.authReducer.authData);
	const handleLogOut = () => {
		dispatch(logout());
	};

	useEffect(() => {
		const fetchProfileUser = async () => {
			if (profileUserId === user._id) {
				setProfileUser(user);
			} else {
				const profileUser = await UserApi.getUser(profileUserId);
				setProfileUser(profileUser);
			}
		};
		fetchProfileUser();
	}, [user]);

	if (!params.id) {
		return <React.Fragment></React.Fragment>;
	}
	return (
		<div className="ProfileInfoCard">
			<div className="infoHead">
				<h4>Profile Info</h4>
				{user._id === profileUserId ? (
					<div>
						<UilPen
							width="2rem"
							height="1.2rem"
							onClick={() => setModalOpened(true)}
						/>
						<ProfileInfoCard
							modalOpened={modalOpened}
							setModalOpened={setModalOpened}
							data={user}
						/>
					</div>
				) : (
					""
				)}
			</div>

			<div className="info">
				{/* */}
				<span>
					<b>Status </b>
				</span>
				<span>{profileUser.relationship}</span>
			</div>
			<div className="info">
				<span>
					<b>Lives in </b>
				</span>
				<span>{profileUser.livesIn}</span>
			</div>
			<div className="info">
				<span>
					<b>Works at </b>
				</span>
				<span>{profileUser.worksAt}</span>
			</div>

			<button className="button logout-button" onClick={handleLogOut}>
				Log Out
			</button>
		</div>
	);
};

export default ProfileDetails;
