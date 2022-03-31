const postManager = require("../managers/post");
const reactionManager = require("../managers/reaction");
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

		const data = await Promise.all(
			posts.map(post => reactionManager.getOnePostReactions(post.id))
		);
		posts.forEach((post, i) => (post.reactions = data[i]));

		res.status(200).json(posts);
	} catch (err) {
		console.error(`Failed to get all posts ✖\n${err}`);
		res.status(500).json({ message: "Internal Server Error" });
	}
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
		if (post.image) await deletePostImage(post.image);
		await postManager.deletePost(post.id);
		res.status(200).json({ message: "Post deleted" });
	} catch (err) {
		console.error(`Failed to delete post ✖\n${err}`);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

exports.react = async (req, res) => {
	const newReaction = {
		user_id: res.locals.userId,
		post_id: res.locals.post.id,
		type: req.body.type,
	};

	try {
		let message = "";

		const reaction = await reactionManager.reactionExists(newReaction);

		if (!reaction) {
			await reactionManager.addReaction(newReaction);
			message = "Post reaction added";
		} else {
			if (reaction.type === newReaction.type) {
				await reactionManager.removeReaction(reaction.id);
				message = "Post reaction removed";
			} else {
				await reactionManager.updateReaction(reaction.id, newReaction.type);
				message = "Post reaction updated";
			}
		}

		res.status(200).json({ message });
	} catch (err) {
		console.error(`Failed to react ✖\n${err}`);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

exports.getOnePostReactions = async (req, res) => {
	try {
		const reactions = await reactionManager.getOnePostReactions(
			res.locals.post.id
		);
		res.status(200).json(reactions);
	} catch (err) {
		console.error(`Failed to get one post reactions ✖\n${err}`);
		res.status(500).json({ message: "Internal Server Error" });
	}
};
