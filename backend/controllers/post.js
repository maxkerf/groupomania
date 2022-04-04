const postManager = require("../managers/post");
const commentManager = require("../managers/comment");
const reactionManager = require("../managers/reaction");
const handleError = require("../globalFunctions/handleError");
const deletePostImage = require("../globalFunctions/deletePostImage");

exports.createPost = async (req, res) => {
	if (!req.body.text && !req.file)
		return res
			.status(400)
			.json({ message: "At least one input (text or image) is required" });

	const newPost = {
		user_id: res.locals.userId,
	};

	if (req.body.text) newPost.text = req.body.text;
	if (req.file) newPost.image = req.file.filename;

	try {
		const data = await postManager.createPost(newPost);
		const postCreated = await postManager.getPost(data.insertId);
		res.status(201).json({ message: "Post created", postCreated });
	} catch (err) {
		console.error(`Failed to create post ✖\n${err}`);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

exports.getPosts = async (req, res) => {
	const offset = req.query.offset ? parseInt(req.query.offset) : 0;

	let posts = [];
	try {
		posts = await postManager.getPosts(offset);
		const promises = posts.map(post =>
			reactionManager.getOnePostReactions(post.id)
		);
		const data = await Promise.all(promises);
		posts.forEach((post, i) => (post.reactions = data[i]));
	} catch (err) {
		return handleError(err, res, "get posts");
	}

	res.status(200).json(posts);
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

exports.getPost = async (req, res) => {
	res.status(200).json(res.locals.post);
};

exports.deletePost = async (req, res) => {
	const post = res.locals.post;

	try {
		await reactionManager.deletePostReactions(post.id);
		await commentManager.deletePostComments(post.id);
		if (post.image) await deletePostImage(post.image);
		await postManager.deletePost(post.id);
		res.status(200).json({ message: "Post deleted" });
	} catch (err) {
		console.error(`Failed to delete post ✖\n${err}`);
		res.status(500).json({ message: "Internal Server Error" });
	}
};
