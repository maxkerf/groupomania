const db = require("../database");

exports.addReaction = reaction => {
	const sql = "INSERT INTO reaction SET ?";

	return new Promise((resolve, reject) => {
		db.query(sql, reaction, (err, data) => (err ? reject(err) : resolve(data)));
	});
};

exports.getReactionById = id => {
	const sql = "SELECT * FROM reaction WHERE id = ?";

	return new Promise((resolve, reject) => {
		db.query(sql, id, (err, data) => (err ? reject(err) : resolve(data[0])));
	});
};

exports.reactionExists = reaction => {
	const sql = "SELECT * FROM reaction WHERE user_id = ? AND post_id = ?";

	return new Promise((resolve, reject) => {
		db.query(sql, [reaction.user_id, reaction.post_id], (err, data) =>
			err ? reject(err) : resolve(data[0])
		);
	});
};

exports.updateReaction = (id, newType) => {
	const sql = "UPDATE reaction SET type = ? WHERE id = ?";

	return new Promise((resolve, reject) => {
		db.query(sql, [newType, id], err => (err ? reject(err) : resolve()));
	});
};

exports.removeReaction = id => {
	const sql = "DELETE FROM reaction WHERE id = ?";

	return new Promise((resolve, reject) => {
		db.query(sql, id, err => (err ? reject(err) : resolve()));
	});
};

exports.getOnePostReactions = postId => {
	const sql = "SELECT * FROM reaction WHERE post_id = ?";

	return new Promise((resolve, reject) => {
		db.query(sql, postId, (err, data) => (err ? reject(err) : resolve(data)));
	});
};
