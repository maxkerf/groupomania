const express = require("express");
const { body } = require("express-validator");

const postCtrl = require("../controllers/post");
const postManager = require("../managers/post");
const authenticateUser = require("../middlewares/authenticateUser");
const authorizeUser = require("../middlewares/authorizeUser");
const checkErrors = require("../middlewares/checkErrors");
const uploadPostImage = require("../middlewares/uploadPostImage");
const parseBodyFromMulter = require("../middlewares/parseBodyFromMulter");

const router = express.Router();

router.use(authenticateUser);

router.param("id", async (req, res, next, postId) => {
	try {
		const post = await postManager.getPost(postId);
		if (!post) return res.status(404).json({ message: "Post not found" });
		res.locals.post = post;
		next();
	} catch (err) {
		console.error(`Failed to get post ✖\n${err}`);
		res.status(500).json({ message: "Internal Server Error" });
	}
});

// Create Post
router.post(
	"/",
	uploadPostImage,
	parseBodyFromMulter,

	body("text")
		.notEmpty()
		.withMessage("Text required")
		.isString()
		.withMessage("Text must be a string")
		.isLength({ max: 255 })
		.withMessage("Text must be at most 255 characters"),

	checkErrors,
	postCtrl.createPost
);

// Get Posts
router.get("/", postCtrl.getPosts);

// Count Posts
router.get("/count", postCtrl.countPosts);

// Get Post
router.get("/:id", postCtrl.getPost);

// Delete Post
router.delete("/:id", authorizeUser, postCtrl.deletePost);

module.exports = router;
