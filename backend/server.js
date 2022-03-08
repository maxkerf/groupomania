require("dotenv").config();
require("./database");
const app = require("./app");

const http = require("http");
const server = http.createServer(app);

const handleError = err => {
	console.error(err);
	process.exit(1);
};

try {
	server.listen(process.env.PORT || 3000);
} catch (err) {
	handleError(err);
}

server.on("listening", () => {
	console.log("Welcome to Groupomania 🌐");
	console.log(`Listening on port ${server.address().port} ✔`);
});
server.on("error", handleError);
