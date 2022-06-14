const mysql = require("mysql");

const CONNECTION_FAILED_MSG = "Connection to database failed ✖";
const CONNECTION_SUCCEEDED_MSG = "Connected to database ✔";
const KEY_MISSING_ERROR_MSG = "MYSQL connection key is missing";

if (!process.env.MYSQL_CONNECTION_KEY) {
	console.error(CONNECTION_FAILED_MSG);
	console.error(new Error(KEY_MISSING_ERROR_MSG));
	return;
}

const db = mysql.createConnection(process.env.MYSQL_CONNECTION_KEY);

db.connect(err => {
	if (err) {
		console.error(CONNECTION_FAILED_MSG);
		console.error(err);
		return;
	}

	console.log(CONNECTION_SUCCEEDED_MSG);
});

module.exports = db;
