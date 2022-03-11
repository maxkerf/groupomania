const express = require("express");
const router = express.Router();

const postCtrl = require("../controllers/post");
const postManager = require("../managers/post");
const authenticateUser = require("../middlewares/authenticateUser");
const authorizeUser = require("../middlewares/authorizeUser");

router.use(authenticateUser);
router.route("/").post(postCtrl.createPost).get(postCtrl.getPosts);
router.get("/count", postCtrl.countPosts);
router
	.route("/:id")
	.get(postCtrl.getPost)
	.delete(authorizeUser, postCtrl.deletePost);

router.param("id", async (req, res, next, postId) => {
	try {
		const post = await postManager.getPost(postId);
		if (!post) return res.status(404).json({ message: "Post not found" });
		res.locals.post = post;
		next();
	} catch (err) {
		console.error(`Failed to get post ✖\n${err}`);
		res.sendStatus(500);
	}
});

module.exports = router;
