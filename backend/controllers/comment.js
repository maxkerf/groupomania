const commentManager = require("../managers/comment");
const handleError = require("../globalFunctions/handleError");

exports.createComment = async (req, res) => {
	const comment = {
		user_id: res.locals.userId,
		post_id: res.locals.post.id,
		text: req.body.text,
	};

	try {
		const data = await commentManager.createComment(comment);
		const commentCreated = await commentManager.getComment(data.insertId);
		res.status(201).json({ message: "Comment created", commentCreated });
	} catch (err) {
		handleError(err, res, "create comment");
	}
};

exports.getComments = async (req, res) => {
	try {
		const comments = await commentManager.getComments(res.locals.post.id);
		res.status(200).json(comments);
	} catch (err) {
		handleError(err, res, "get comments");
	}
};

exports.deleteComment = async (req, res) => {
	try {
		await commentManager.deleteComment(res.locals.comment.id);
		res.status(200).json({ message: "Comment deleted" });
	} catch (err) {
		handleError(err, res, "delete comment");
	}
};
