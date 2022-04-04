const express = require("express");
const { body } = require("express-validator");
const commentCtrl = require("../controllers/comment");
const commentManager = require("../managers/comment");
const checkErrors = require("../middlewares/checkErrors");
const authorizeUser = require("../middlewares/authorizeUser");
const handleError = require("../globalFunctions/handleError");

const router = express.Router();

router.param("id", async (req, res, next, id) => {
	try {
		const comment = await commentManager.getComment(id);
		if (!comment) return res.status(404).json({ message: "Comment not found" });
		res.locals.comment = comment;
		next();
	} catch (err) {
		handleError(err, res, "get comment");
	}
});

// Create Comment
router.post(
	"/",

	body("text")
		.notEmpty()
		.withMessage("Text required")
		.isString()
		.withMessage("Text must be a string")
		.isLength({ max: 255 })
		.withMessage("Text must be at most 255 characters"),

	checkErrors,
	commentCtrl.createComment
);

// Get Comments
router.get("/", commentCtrl.getComments);

// Delete Comment
router.delete("/:id", authorizeUser.comment, commentCtrl.deleteComment);

module.exports = router;
