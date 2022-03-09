const db = require("../database");

exports.createUser = user => {
	const sql = "INSERT INTO `user` SET ?, `creationDate` = NOW()";

	return new Promise((resolve, reject) => {
		db.query(sql, user, err => (err ? reject(err) : resolve()));
	});
};

exports.getUserByEmail = email => {
	const sql = "SELECT id, password FROM `user` WHERE `email` = ?";

	return new Promise((resolve, reject) => {
		db.query(sql, email, (err, data) => (err ? reject(err) : resolve(data[0])));
	});
};

exports.getUserById = id => {
	const sql =
		"SELECT id, email, username, creationDate, picture FROM `user` WHERE `id` = ?";

	return new Promise((resolve, reject) => {
		db.query(sql, id, (err, data) => (err ? reject(err) : resolve(data[0])));
	});
};

exports.deleteUser = id => {
	const sql = "DELETE FROM `user` WHERE `id` = ?";

	return new Promise((resolve, reject) => {
		db.query(sql, id, err => (err ? reject(err) : resolve()));
	});
};
