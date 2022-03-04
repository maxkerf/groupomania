const express = require("express");
const app = express();

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");

	next();
});
app.use(express.json());

const authenticateUser = require("./middlewares/authenticateUser");
app.get("/", authenticateUser, (req, res) =>
	res.status(200).json({ message: "Welcome to Groupomania 🔥" })
);

const userRouter = require("./routers/user");

app.use("/", userRouter);

module.exports = app;
