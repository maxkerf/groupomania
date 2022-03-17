const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const userCtrl = require("../controllers/user");
const userManager = require("../managers/user");
const authenticateUser = require("../middlewares/authenticateUser");
const checkErrors = require("../middlewares/checkErrors");
const uploadImage = require("../middlewares/uploadImage");

async function isEmailUnique(email) {
	let user;

	try {
		user = await userManager.getUserByEmail(email);
	} catch (err) {
		console.error(`Failed to signup ✖\n${err}`);
		throw { status: 500 };
	}

	if (user) throw Error("Email already in use");
}

router.post(
	"/signup",

	body("email")
		.toLowerCase()
		.notEmpty()
		.withMessage("Email required")
		.isString()
		.withMessage("Email must be a string")
		.isLength({ max: 50 })
		.withMessage("Email must be at most 50 characters")
		.isEmail()
		.withMessage("Email must respect a good email form")
		.custom(isEmailUnique),

	body("password")
		.notEmpty()
		.withMessage("Password required")
		.isString()
		.withMessage("Password must be a string")
		.isLength({ max: 30 })
		.withMessage("Password must be at most 30 characters"),

	body("username")
		.trim()
		.notEmpty()
		.withMessage("Username required")
		.isString()
		.withMessage("Username must be a string")
		.isLength({ max: 30 })
		.withMessage("Username must be at most 30 characters"),

	checkErrors,
	userCtrl.signup
);

router.post(
	"/login",

	body("email")
		.notEmpty()
		.withMessage("Email required")
		.isString()
		.withMessage("Email must be a string")
		.isEmail()
		.withMessage("Email must respect a good email form"),

	body("password")
		.notEmpty()
		.withMessage("Password required")
		.isString()
		.withMessage("Password must be a string"),

	checkErrors,
	userCtrl.login
);

router.use(authenticateUser);
router.delete("/", userCtrl.deleteUser);
router.put("/picture", uploadImage, userCtrl.updateUserPicture);
router.put("/", userCtrl.updateUser);
router.get("/:id", userCtrl.getOneUser);

module.exports = router;
