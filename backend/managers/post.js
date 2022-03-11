const db = require("../database");

exports.createPost = post => {
	const sql = "INSERT INTO `post` SET ?, `creationDate` = NOW()";

	return new Promise((resolve, reject) => {
		db.query(sql, post, err => (err ? reject(err) : resolve()));
	});
};

exports.getPosts = (offset = 0) => {
	const sql =
		"SELECT post.id AS id, user_id, post.creationDate AS creationDate, text, username, picture AS user_picture FROM `post`INNER JOIN `user` ON post.user_id = user.id ORDER BY post.creationDate DESC LIMIT 2 OFFSET ?";

	return new Promise((resolve, reject) => {
		db.query(sql, offset, (err, data) => (err ? reject(err) : resolve(data)));
	});
};

exports.countPosts = () => {
	const sql = "SELECT COUNT(*) FROM `post`";

	return new Promise((resolve, reject) => {
		db.query(sql, (err, data) =>
			err ? reject(err) : resolve(data[0]["COUNT(*)"])
		);
	});
};

exports.getPostById = postId => {
	const sql = "SELECT * FROM `post` WHERE `id` = ?";

	return new Promise((resolve, reject) => {
		db.query(sql, postId, (err, data) =>
			err ? reject(err) : resolve(data[0])
		);
	});
};

exports.deletePost = postId => {
	const sql = "DELETE FROM `post` WHERE `id` = ?";

	return new Promise((resolve, reject) => {
		db.query(sql, postId, err => (err ? reject(err) : resolve()));
	});
};

exports.deleteUserPosts = userId => {
	const sql = "DELETE FROM `post` WHERE `user_id` = ?";

	return new Promise((resolve, reject) => {
		db.query(sql, userId, err => (err ? reject(err) : resolve()));
	});
};
