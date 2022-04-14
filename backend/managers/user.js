const db = require("../database");

exports.createUser = user => {
	const sql = "INSERT INTO `user` SET ?, `creationDate` = NOW()";

	return new Promise((resolve, reject) => {
		db.query(sql, user, err => (err ? reject(err) : resolve()));
	});
};

exports.getUserByEmail = userEmail => {
	const sql = "SELECT id, password, role FROM user WHERE email = ?";

	return new Promise((resolve, reject) => {
		db.query(sql, userEmail, (err, data) =>
			err ? reject(err) : resolve(data[0])
		);
	});
};

exports.getUserById = userId => {
	const sql =
		"SELECT id, username, creationDate, picture, role FROM user WHERE id = ?";

	return new Promise((resolve, reject) => {
		db.query(sql, userId, (err, data) =>
			err ? reject(err) : resolve(data[0])
		);
	});
};

exports.isUsernameUnique = username => {
	const sql = "SELECT COUNT(*) FROM user WHERE username = ?";

	return new Promise((resolve, reject) => {
		db.query(sql, username, (err, data) =>
			err ? reject(err) : resolve(!data[0]["COUNT(*)"])
		);
	});
};

exports.updateUser = (userId, newUser) => {
	const sql = "UPDATE user SET ? WHERE id = ?";

	return new Promise((resolve, reject) => {
		db.query(sql, [newUser, userId], err => (err ? reject(err) : resolve()));
	});
};

exports.updateUserPicture = (userId, newPicture) => {
	const sql = "UPDATE user SET picture = ? WHERE id = ?";

	return new Promise((resolve, reject) => {
		db.query(sql, [newPicture, userId], err => (err ? reject(err) : resolve()));
	});
};

exports.deleteUser = userId => {
	const sql = "DELETE FROM `user` WHERE `id` = ?";

	return new Promise((resolve, reject) => {
		db.query(sql, userId, err => (err ? reject(err) : resolve()));
	});
};
