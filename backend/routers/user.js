const express = require("express");
const { body } = require("express-validator");

const userCtrl = require("../controllers/user");
const userManager = require("../managers/user");
const authenticateUser = require("../middlewares/authenticateUser");
const checkErrors = require("../middlewares/checkErrors");
const uploadUserPicture = require("../middlewares/uploadUserPicture");

async function isEmailUnique(email) {
	let user;

	try {
		user = await userManager.getUserByEmail(email);
	} catch (err) {
		console.error(`Failed to signup ✖\n${err}`);
		throw { status: 500 };
	}

	if (user) throw Error("Email already in use");

	return true;
}

async function isUsernameUnique(username) {
	let isUnique;

	try {
		isUnique = await userManager.isUsernameUnique(username);
	} catch (err) {
		console.error(`Failed to signup ✖\n${err}`);
		throw { status: 500 };
	}

	if (!isUnique) throw Error("Username already in use");

	return true;
}

const router = express.Router();

// Signup
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
		.withMessage("Username must be at most 30 characters")
		.custom(isUsernameUnique),

	checkErrors,
	userCtrl.signup
);

// Login
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

// Get One User
router.get("/:id", userCtrl.getOneUser);

// Update User
router.put(
	"/",

	body("username")
		.trim()
		.notEmpty()
		.withMessage("Username required")
		.isString()
		.withMessage("Username must be a string")
		.isLength({ max: 30 })
		.withMessage("Username must be at most 30 characters")
		.custom(isUsernameUnique),

	checkErrors,
	userCtrl.updateUser
);

// Update User Picture
router.put("/picture", uploadUserPicture, userCtrl.updateUserPicture);

// Delete User
router.delete("/", userCtrl.deleteUser);

module.exports = router;
