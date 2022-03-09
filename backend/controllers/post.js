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

exports.getAllPosts = async (req, res) => {
	try {
		const posts = await postManager.getAllPosts();
		res.status(200).json(posts);
	} catch (err) {
		console.error(`Failed to get all posts ✖\n${err}`);
		res.sendStatus(500);
	}
};
