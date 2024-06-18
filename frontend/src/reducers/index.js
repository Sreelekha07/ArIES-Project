import { combineReducers } from "redux";

import authReducer from "./Auth";
import postReducer from "./Post";
import chatReducer from "./ChatUser";

export const reducers = combineReducers({
	authReducer,
	postReducer,
	chatReducer,
});
