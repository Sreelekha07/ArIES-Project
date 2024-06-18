import React, { useEffect, useState } from "react";
import { getTimelinePosts } from "../../actions/Actions.js";
import Post from "../Post/Post";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllUser } from "../../api/User";

const Posts = () => {
	const [persons, setPersons] = useState("unfetched");

	useEffect(() => {
		const fetchPersons = async () => {
			const { data } = await getAllUser();
			setPersons(data);
		};
		fetchPersons();
	}, []);
	const params = useParams();
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.authReducer.authData);
	let { posts, loading } = useSelector((state) => state.postReducer);
	useEffect(() => {
		dispatch(getTimelinePosts(user._id));
	}, []);
	if (!posts) return "There are no posts currently!";
	if (params.id) posts = posts.filter((post) => post.userId === params.id);
	if (persons === "unfetched") {
		return <div>Fetching users...</div>;
	}
	return (
		<div className="Posts">
			{loading
				? "Fetching posts...."
				: posts.map((post, id) => {
						const postOwner = persons.find(
							(person) => post.userId === person._id
						);
						return (
							<Post
								data={post}
								key={id}
								postOwner={postOwner}
								allUsers={persons}
							/>
						);
				  })}
		</div>
	);
};

export default Posts;
