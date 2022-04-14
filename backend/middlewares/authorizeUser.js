const BASIC = 0;
const ADMIN = 1;

exports.user = (req, res, next) => {
	const authUser = res.locals.authenticatedUser;
	const user = res.locals.user;

	if (authUser.role !== ADMIN && user.id !== authUser.id)
		return res.status(403).json({ message: "Not allowed" });

	next();
};

exports.post = (req, res, next) => {
	const authUser = res.locals.authenticatedUser;
	const post = res.locals.post;

	if (authUser.role !== ADMIN && post.user_id !== authUser.id)
		return res.status(403).json({ message: "Post not owned" });

	next();
};

exports.comment = (req, res, next) => {
	const authUser = res.locals.authenticatedUser;
	const comment = res.locals.comment;

	if (authUser.role !== ADMIN && comment.user_id !== authUser.id)
		return res.status(403).json({ message: "Comment not owned" });

	next();
};
