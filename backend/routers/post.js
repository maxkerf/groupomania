const express = require("express");
const router = express.Router();

const postCtrl = require("../controllers/post");
const postManager = require("../managers/post");
const authenticateUser = require("../middlewares/authenticateUser");
const authorizeUser = require("../middlewares/authorizeUser");

router.use(authenticateUser);
router.route("/").post(postCtrl.createPost).get(postCtrl.getPosts);
router.route("/:id").delete(authorizeUser, postCtrl.deletePost);

router.param("id", async (req, res, next, postId) => {
	try {
		const post = await postManager.getPostById(postId);
		if (!post) return res.status(404).json({ message: "Post not found" });
		res.locals.post = post;
		next();
	} catch (err) {
		console.error(`Failed to get one post ✖\n${err}`);
		res.sendStatus(500);
	}
});

module.exports = router;
