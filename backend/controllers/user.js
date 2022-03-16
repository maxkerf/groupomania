const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");

const userManager = require("../managers/user");
const postManager = require("../managers/post");

async function deleteUserPicture(userId) {
	const user = await userManager.getUserById(userId);
	const path = `images/${user.picture}`;

	return new Promise((resolve, reject) => {
		if (user.picture === "user.svg") return resolve();
		fs.unlink(path, err => (err ? reject(err) : resolve()));
	});
}

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
		res.sendStatus(500);
	}
};

exports.login = async (req, res) => {
	const errorMessage = "Wrong email or password";

	try {
		const user = await userManager.getUserByEmail(req.body.email);
		if (!user) return res.status(400).json({ errorMessage });

		const isPasswordValid = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!isPasswordValid) return res.status(400).json({ errorMessage });

		const userId = user.id;
		const token = jwt.sign({ userId }, process.env.TOKEN_SECRET_KEY, {
			expiresIn: "1h",
		});

		res.status(200).json({ userId, token });
	} catch (err) {
		console.error(`Failed to login ✖\n${err}`);
		res.sendStatus(500);
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
		res.sendStatus(500);
	}
};

exports.getOneUser = async (req, res) => {
	try {
		const user = await userManager.getUserById(req.params.id);
		if (!user) return res.status(404).json({ message: "User not found" });
		res.status(200).json(user);
	} catch (err) {
		console.error(`Failed to get one user ✖\n${err}`);
		res.sendStatus(500);
	}
};

exports.updateUserPicture = async (req, res) => {
	const userId = res.locals.userId;
	const newPicture = req.file.filename;

	try {
		await deleteUserPicture(userId);
		await userManager.updateUserPicture(userId, newPicture);
		res.status(200).json({ message: "User picture updated", newPicture });
	} catch (err) {
		console.error(`Failed to update user picture ✖\n${err}`);
		res.sendStatus(500);
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
		res.sendStatus(500);
	}
};
