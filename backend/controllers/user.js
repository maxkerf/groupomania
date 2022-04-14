const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userManager = require("../managers/user");
const postManager = require("../managers/post");
const handleError = require("../globalFunctions/handleError");
const deleteUserPicture = require("../globalFunctions/deleteUserPicture");

exports.signup = async (req, res) => {
	try {
		const hashedPassword = await bcrypt.hash(req.body.password, 10);

		const user = {
			email: req.body.email,
			username: req.body.username,
			password: hashedPassword,
		};

		await userManager.createUser(user);

		res.status(201).json({ message: "User signed up" });
	} catch (err) {
		handleError(err, res, "signup");
	}
};

exports.login = async (req, res) => {
	const errorObj = { message: "Wrong email or password" };

	try {
		const user = await userManager.getUserByEmail(req.body.email);
		if (!user) return res.status(400).json(errorObj);

		const isPasswordValid = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!isPasswordValid) return res.status(400).json(errorObj);

		const userId = user.id;
		const token = jwt.sign({ userId }, process.env.TOKEN_SECRET_KEY, {
			expiresIn: "10h",
		});

		res.status(200).json({ message: "User logged in", userId, token });
	} catch (err) {
		handleError(err, res, "login");
	}
};

exports.getOneUser = async (req, res) => {
	res.status(200).json(res.locals.user);
};

exports.updateUser = async (req, res) => {
	const userId = res.locals.user.id;
	const newUser = {
		username: req.body.username,
	};

	try {
		await userManager.updateUser(userId, newUser);
		res.status(200).json({ message: "User updated" });
	} catch (err) {
		handleError(err, res, "update user");
	}
};

exports.updateUserPicture = async (req, res) => {
	const userId = res.locals.user.id;
	const newPicture = req.file.filename;

	try {
		const user = await userManager.getUserById(userId);
		await userManager.updateUserPicture(userId, newPicture);
		await deleteUserPicture(user.picture);
		res
			.status(200)
			.json({ message: "User picture updated", pictureUpdated: newPicture });
	} catch (err) {
		await deleteUserPicture(newPicture);
		handleError(err, res, "update user picture");
	}
};

exports.deleteUser = async (req, res) => {
	const user = res.locals.user;

	try {
		await deleteUserPicture(user.picture);
		await postManager.deleteUserPosts(user.id);
		await userManager.deleteUser(user.id);
		res.status(200).json({ message: "User deleted" });
	} catch (err) {
		handleError(err, res, "delete user");
	}
};
