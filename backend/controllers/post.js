const postManager = require("../managers/post");
const deletePostImage = require("../globalFunctions/deletePostImage");

exports.createPost = async (req, res) => {
	const newPost = {
		user_id: res.locals.userId,
		text: req.body.text,
		image: req.file.filename,
	};

	try {
		const data = await postManager.createPost(newPost);
		res.status(201).json({ message: "Post created", postId: data.insertId });
	} catch (err) {
		console.error(`Failed to create post ✖\n${err}`);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

exports.getPosts = async (req, res) => {
	const offset = req.query.offset ? parseInt(req.query.offset) : 0;

	try {
		const posts = await postManager.getPosts(offset);
		res.status(200).json(posts);
	} catch (err) {
		console.error(`Failed to get all posts ✖\n${err}`);
		res.status(500).json({ message: "Internal Server Error" });
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
		res.status(500).json({ message: "Internal Server Error" });
	}
};

exports.deletePost = async (req, res) => {
	const post = res.locals.post;

	try {
		await deletePostImage(post.image);
		await postManager.deletePost(post.id);
		res.status(200).json({ message: "Post deleted" });
	} catch (err) {
		console.error(`Failed to delete post ✖\n${err}`);
		res.status(500).json({ message: "Internal Server Error" });
	}
};
