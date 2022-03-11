const postManager = require("../managers/post");

exports.createPost = async (req, res) => {
	const newPost = {
		user_id: res.locals.userId,
		text: req.body.text,
	};

	try {
		const data = await postManager.createPost(newPost);
		res.status(201).json({ message: "Post created", postId: data.insertId });
	} catch (err) {
		console.error(`Failed to create post ✖\n${err}`);
		res.sendStatus(500);
	}
};

exports.getPosts = async (req, res) => {
	const offset = req.query.offset ? parseInt(req.query.offset) : 0;

	try {
		const posts = await postManager.getPosts(offset);
		res.status(200).json(posts);
	} catch (err) {
		console.error(`Failed to get all posts ✖\n${err}`);
		res.sendStatus(500);
	}
};

exports.getPost = async (req, res) => {
	res.status(200).json(res.locals.post);
};

exports.countPosts = async (req, res) => {
	try {
		const nbPosts = await postManager.countPosts();
		res.status(200).json(nbPosts);
	} catch (err) {
		console.error(`Failed to count posts ✖\n${err}`);
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
