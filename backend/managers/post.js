const db = require("../database");

exports.createPost = post => {
	const sql = "INSERT INTO `post` SET ?, `creationDate` = NOW()";

	return new Promise((resolve, reject) => {
		db.query(sql, post, (err, data) => (err ? reject(err) : resolve(data)));
	});
};

exports.getPosts = (offset = 0) => {
	const sql = `SELECT 
	post.id, 
	post.user_id, 
	post.creationDate, 
	post.lastUpdate,
  post.text, 
	post.image, 
	user.username AS user_username, 
	user.picture AS user_picture 
	FROM post 
	INNER JOIN user ON post.user_id = user.id 
	ORDER BY post.creationDate DESC 
	LIMIT 1 OFFSET ?`;

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

exports.getPost = postId => {
	const sql = `SELECT 
		post.id, 
		post.user_id, 
		post.creationDate,
		post.lastUpdate,
		post.text, 
		post.image, 
		user.username AS user_username, 
		user.picture AS user_picture 
		FROM post 
		INNER JOIN user ON post.user_id = user.id 
		WHERE post.id = ?`;

	return new Promise((resolve, reject) => {
		db.query(sql, postId, (err, data) =>
			err ? reject(err) : resolve(data[0])
		);
	});
};

exports.updatePost = (postId, newPost) => {
	const sql = "UPDATE post SET ?, lastUpdate = NOW() WHERE id = ?";

	return new Promise((resolve, reject) => {
		db.query(sql, [newPost, postId], (err, data) =>
			err ? reject(err) : resolve(data)
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
