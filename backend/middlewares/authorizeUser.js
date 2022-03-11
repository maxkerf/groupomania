module.exports = authorizeUser = (req, res, next) => {
	const userId = res.locals.userId;
	const post = res.locals.post;

	if (post.user_id !== userId)
		return res.status(403).json({ message: "Post not owned" });

	next();
};
