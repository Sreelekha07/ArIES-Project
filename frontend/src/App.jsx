import "./App.styles.css";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage/AuthPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import { useSelector } from "react-redux";
import Chat from "./pages/Chat/Chat";

function App() {
	const user = useSelector((state) => state.authReducer.authData);
	return (
		<div
			className="App"
			style={{
				height:
					window.location.href === "http://localhost:3000/chat"
						? "calc(100vh - 2rem)"
						: "auto",
			}}
		>
			<div className="blur" style={{ top: "-18%", right: "0" }}></div>
			<div className="blur" style={{ top: "36%", left: "-8rem" }}></div>
			<Routes>
				<Route
					path="/"
					element={
						user ? <Navigate to="home" /> : <Navigate to="auth" />
					}
				/>
				<Route
					path="/auth"
					element={user ? <Navigate to="../home" /> : <AuthPage />}
				/>
				<Route
					path="/profile/:id"
					element={user ? <ProfilePage /> : <Navigate to="../auth" />}
				/>
				<Route
					path="/home"
					element={user ? <HomePage /> : <Navigate to="../auth" />}
				/>

				<Route
					path="*"
					element={
						<main style={{ padding: "1rem" }}>
							<p>There's nothing here!</p>
						</main>
					}
				/>

				<Route
					path="/chat"
					element={user ? <Chat /> : <Navigate to="../auth" />}
				/>
			</Routes>
		</div>
	);
}

export default App;
