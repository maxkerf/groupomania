const db = require("../database");

exports.createPost = post => {
	const sql = "INSERT INTO `post` SET ?, `creationDate` = NOW()";

	return new Promise((resolve, reject) => {
		db.query(sql, post, err => (err ? reject(err) : resolve()));
	});
};

exports.getAllPosts = () => {
	const sql =
		"SELECT post.id AS id, user_id, post.creationDate AS creationDate, text, username, picture AS user_picture FROM `post`INNER JOIN `user` ON post.user_id = user.id";

	return new Promise((resolve, reject) => {
		db.query(sql, (err, data) => (err ? reject(err) : resolve(data)));
	});
};
