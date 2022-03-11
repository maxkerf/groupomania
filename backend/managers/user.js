const db = require("../database");

exports.createUser = user => {
	const sql = "INSERT INTO `user` SET ?, `creationDate` = NOW()";

	return new Promise((resolve, reject) => {
		db.query(sql, user, err => (err ? reject(err) : resolve()));
	});
};

exports.getUserByEmail = userEmail => {
	const sql = "SELECT id, password FROM `user` WHERE `email` = ?";

	return new Promise((resolve, reject) => {
		db.query(sql, userEmail, (err, data) =>
			err ? reject(err) : resolve(data[0])
		);
	});
};

exports.getUserById = userId => {
	const sql =
		"SELECT id, username, creationDate, picture FROM `user` WHERE `id` = ?";

	return new Promise((resolve, reject) => {
		db.query(sql, userId, (err, data) =>
			err ? reject(err) : resolve(data[0])
		);
	});
};

exports.deleteUser = userId => {
	const sql = "DELETE FROM `user` WHERE `id` = ?";

	return new Promise((resolve, reject) => {
		db.query(sql, userId, err => (err ? reject(err) : resolve()));
	});
};
