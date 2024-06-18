import {
	legacy_createStore as createStore,
	applyMiddleware,
	compose,
} from "redux";
import thunk from "redux-thunk";
import { reducers } from "../reducers";

function loadFromLocalStorage() {
	try {
		const serializedStore = window.localStorage.getItem("store");
		if (serializedStore === null) return undefined;
		return JSON.parse(serializedStore);
	} catch (e) {
		return undefined;
	}
}

function saveToLocalStorage(store) {
	try {
		const serializedStore = JSON.stringify(store);
		window.localStorage.setItem("store", serializedStore);
	} catch (e) {}
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistedState = loadFromLocalStorage();

const store = createStore(
	reducers,
	persistedState,
	composeEnhancers(applyMiddleware(thunk))
);

store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;
