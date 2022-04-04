exports.post = (req, res, next) => {
	const userId = res.locals.userId;
	const post = res.locals.post;

	if (post.user_id !== userId)
		return res.status(403).json({ message: "Post not owned" });

	next();
};

exports.comment = (req, res, next) => {
	const userId = res.locals.userId;
	const comment = res.locals.comment;

	if (comment.user_id !== userId)
		return res.status(403).json({ message: "Comment not owned" });

	next();
};
