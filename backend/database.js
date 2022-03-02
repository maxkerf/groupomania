const mysql = require("mysql");

const db = mysql.createConnection(process.env.MYSQL_CONNECTION_KEY);

db.connect(err => {
	if (err) return console.error("Connection to database failed ✖\n", err);

	console.log("Connected to database ✔");
});

module.exports = db;
