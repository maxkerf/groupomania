const express = require("express");
const { body } = require("express-validator");

const reactionCtrl = require("../controllers/reaction");
const checkErrors = require("../middlewares/checkErrors");

const router = express.Router({ mergeParams: true });

// React
router.post(
	"/",

	body("type")
		.notEmpty()
		.withMessage("Reaction type required")
		.isInt()
		.withMessage("Reaction type must be an integer")
		.isInt({ min: 0, max: 3 })
		.withMessage("Invalid reaction (dislike: 0, like: 1, love: 2, laugh: 3)"),

	checkErrors,
	reactionCtrl.react
);

// Get One Post Reactions
router.get("/", reactionCtrl.getOnePostReactions);

module.exports = router;
