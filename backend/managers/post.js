const db = require("../database");

exports.createPost = post => {
	const sql = "INSERT INTO `post` SET ?, `creationDate` = NOW()";

	return new Promise((resolve, reject) => {
		db.query(sql, post, err => (err ? reject(err) : resolve()));
	});
};
