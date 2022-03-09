const postManager = require("../managers/post");

exports.createPost = async (req, res) => {
	const post = {
		user_id: res.locals.userId,
		text: req.body.text,
	};

	try {
		await postManager.createPost(post);
		res.status(201).json({ message: "Post created" });
	} catch (err) {
		console.error(`Failed to create post ✖\n${err}`);
		res.sendStatus(500);
	}
};
