import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import AuthRoute from "./routes/Auth.js";
import UserRoute from "./routes/User.js";
import PostRoute from "./routes/Post.js";
import UploadRoute from "./routes/Upload.js";
import ChatRoute from "./routes/Chat.js";
import MessageRoute from "./routes/Message.js";

const app = express();

dotenv.config();
const PORT = process.env.PORT;

const CONNECTION = process.env.MONGODB_CONNECTION;

app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(cors());
app.use(express.static("public"));
app.use("/images", express.static("images"));

mongoose
	.connect(CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() =>
		app.listen(PORT, () => console.log(`Started at Port ${PORT}`))
	)
	.catch((error) => console.log(`${error}, problem connecting!`));

app.use("/auth", AuthRoute);
app.use("/user", UserRoute);
app.use("/posts", PostRoute);
app.use("/upload", UploadRoute);
app.use("/chat", ChatRoute);
app.use("/message", MessageRoute);
