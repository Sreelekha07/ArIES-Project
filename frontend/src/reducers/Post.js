const postReducer = (
	state = { posts: null, loading: false, error: false, uploading: false },
	action
) => {
	switch (action.type) {
		case "UPLOAD_START":
			return { ...state, error: false, uploading: true };
		case "UPLOAD_SUCCESS":
			return {
				...state,
				posts: [action.data, ...state.posts],
				uploading: false,
				error: false,
			};
		case "UPLOAD_FAIL":
			return { ...state, uploading: false, error: true };

		case "RETREIVING_FAIL":
			return { ...state, loading: false, error: true };

		case "ADD_COMMENT":
			state.posts
				.find((post) => post._id === action.data.postId)
				.comments.push({
					userId: action.data.userId,
					content: action.data.content,
				});
			return {
				...state,
			};

		case "RETREIVING_START":
			return { ...state, loading: true, error: false };
		case "RETREIVING_SUCCESS":
			return {
				...state,
				posts: action.data,
				loading: false,
				error: false,
			};

		default:
			return state;
	}
};

export default postReducer;
