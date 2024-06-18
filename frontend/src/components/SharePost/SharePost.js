import React, { useState, useRef } from "react";
import "./SharePost.styles.css";
import { UilTimes } from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage, uploadPost } from "../../actions/Actions.js";
import ReactPlayer from "react-player";

const SharePost = () => {
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.authReducer.authData);
	const loading = useSelector((state) => state.postReducer.uploading);
	const [image, setImage] = useState(null);
	const desc = useRef();
	const publicServer = process.env.REACT_APP_PUBLIC_FOLDER;

	const onImageChange = (event) => {
		if (event.target.files && event.target.files[0]) {
			let img = event.target.files[0];
			setImage(img);
		}
	};

	const imageRef = useRef();

	const handleUpload = async (e) => {
		e.preventDefault();
		const newPost = {
			userId: user._id,
			desc: desc.current.value,
		};

		if (image) {
			const data = new FormData();
			const fileName = Date.now() + image.name;
			data.append("name", fileName);
			data.append("file", image);
			newPost.image = fileName;
			try {
				dispatch(uploadImage(data));
			} catch (err) {
			}
		}
		dispatch(uploadPost(newPost));
		resetShare();
	};

	const resetShare = () => {
		setImage(null);
		desc.current.value = "";
	};
	return (
		<React.Fragment>
			<div className="SharePost">
				<img
					src={
						user.profilePicture
							? publicServer + user.profilePicture
							: publicServer + "defaultProfile.png"
					}
					alt="Profile"
				/>
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "space-between",
						width: "100%",
					}}
				>
					<input
						type="text"
						placeholder="Add a caption..."
						required
						ref={desc}
						style={{ width: "100%" }}
					/>
					<div className="postOptions">
						<button
							className="button ps-button"
							onClick={() => imageRef.current.click()}
						>
							Post
						</button>

						<button
							className="button ps-button"
							onClick={handleUpload}
							disabled={loading}
						>
							{loading ? "uploading" : "Share"}
						</button>

						<div style={{ display: "none" }}>
							<input
								type="file"
								ref={imageRef}
								onChange={onImageChange}
							/>
						</div>
					</div>
				</div>
			</div>
			{image && (
				<div className="previewImage">
					<UilTimes onClick={() => setImage(null)} />
					{console.log(image)}
					{image.name.includes("mp4") ? (
						<div
							style={{
								width: "100%",
								display: "flex",
								justifyContent: "center",
							}}
						>
							<ReactPlayer
								url={URL.createObjectURL(image)}
								controls={true}
							/>
						</div>
					) : (
						<img src={URL.createObjectURL(image)} alt="preview" />
					)}
				</div>
			)}
		</React.Fragment>
	);
};

export default SharePost;
