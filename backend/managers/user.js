const db = require("../database");

exports.createUser = user => {
	const sql = "INSERT INTO `user` SET ?, `creationDate` = NOW()";

	return new Promise((resolve, reject) => {
		db.query(sql, user, err => (err ? reject(err) : resolve()));
	});
};

exports.getUserByEmail = email => {
	const sql = "SELECT * FROM `user` WHERE `email` = ?";

	return new Promise((resolve, reject) => {
		db.query(sql, email, (err, data) => (err ? reject(err) : resolve(data[0])));
	});
};
