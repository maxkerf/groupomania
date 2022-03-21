const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userManager = require("../managers/user");
const postManager = require("../managers/post");
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
		console.error(`Failed to signup ✖\n${err}`);
		res.status(500).json({ message: "Internal Server Error" });
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
			expiresIn: "1h",
		});

		res.status(200).json({ message: "User logged in", userId, token });
	} catch (err) {
		console.error(`Failed to login ✖\n${err}`);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

exports.getOneUser = async (req, res) => {
	try {
		const user = await userManager.getUserById(req.params.id);
		if (!user) return res.status(404).json({ message: "User not found" });
		res.status(200).json(user);
	} catch (err) {
		console.error(`Failed to get one user ✖\n${err}`);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

exports.updateUser = async (req, res) => {
	const userId = res.locals.userId;
	const newUser = {
		username: req.body.username,
	};

	try {
		await userManager.updateUser(userId, newUser);
		res.status(200).json({ message: "User updated" });
	} catch (err) {
		console.error(`Failed to update user ✖\n${err}`);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

exports.updateUserPicture = async (req, res) => {
	const userId = res.locals.userId;
	const newPicture = req.file.filename;

	try {
		const user = await userManager.getUserById(userId);
		await userManager.updateUserPicture(userId, newPicture);
		await deleteUserPicture(user.picture);
		res.status(200).json({ message: "User picture updated", newPicture });
	} catch (err) {
		await deleteUserPicture(newPicture);
		console.error(`Failed to update user picture ✖\n${err}`);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

exports.deleteUser = async (req, res) => {
	const userId = res.locals.userId;

	try {
		await deleteUserPicture(userId);
		await postManager.deleteUserPosts(userId);
		await userManager.deleteUser(userId);
		res.status(200).json({ message: "User deleted" });
	} catch (err) {
		console.error(`Failed to delete user ✖\n${err}`);
		res.status(500).json({ message: "Internal Server Error" });
	}
};
