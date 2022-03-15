const express = require("express");
const app = express();

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");

	// Response to preflight request must have http ok status (it allows us to use "router.use(someMiddleware)" without CORS errors)
	if (req.method === "OPTIONS") return res.sendStatus(200);

	next();
});
app.use(express.json());
app.use("/images", express.static("images"));

app.get("/", (req, res) =>
	res.status(200).json({ message: "Welcome to Groupomania API 🌐" })
);

const userRouter = require("./routers/user");
const postRouter = require("./routers/post");

app.use("/", userRouter);
app.use("/posts", postRouter);

module.exports = app;
