const db = require("../database");

exports.createComment = comment => {
	const sql = "INSERT INTO comment SET ?, creationDate = NOW()";

	return new Promise((resolve, reject) => {
		db.query(sql, comment, (err, data) => (err ? reject(err) : resolve(data)));
	});
};

exports.getComments = postId => {
	const sql = `SELECT
	comment.id,
	comment.user_id,
	comment.post_id,
	comment.text,
	comment.creationDate,
	user.username AS user_username,
	user.picture AS user_picture
	FROM comment
	INNER JOIN user ON comment.user_id = user.id
	WHERE comment.post_id = ?`;

	return new Promise((resolve, reject) => {
		db.query(sql, postId, (err, data) => (err ? reject(err) : resolve(data)));
	});
};

exports.getComment = id => {
	const sql = `SELECT
	comment.id,
	comment.user_id,
	comment.post_id,
	comment.text,
	comment.creationDate,
	user.username AS user_username,
	user.picture AS user_picture
	FROM comment
	INNER JOIN user ON comment.user_id = user.id
	WHERE comment.id = ?`;

	return new Promise((resolve, reject) => {
		db.query(sql, id, (err, data) => (err ? reject(err) : resolve(data[0])));
	});
};

exports.deleteComment = id => {
	const sql = "DELETE FROM comment WHERE id = ?";

	return new Promise((resolve, reject) => {
		db.query(sql, id, err => (err ? reject(err) : resolve()));
	});
};

exports.deletePostComments = postId => {
	const sql = "DELETE FROM comment WHERE post_id = ?";

	return new Promise((resolve, reject) => {
		db.query(sql, postId, err => (err ? reject(err) : resolve()));
	});
};
