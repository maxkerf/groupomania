const express = require("express");
const app = express();

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");

	next();
});
app.use(express.json());

app.get("/", (req, res) =>
	res.status(200).json({ message: "Welcome to Groupomania 🔥" })
);

module.exports = app;
