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

exports.deletePost = async (req, res) => {
	try {
		await postManager.deletePost(req.params.id);
		res.status(200).json({ message: "Post deleted" });
	} catch (err) {
		console.error(`Failed to delete post ✖\n${err}`);
		res.sendStatus(500);
	}
};
