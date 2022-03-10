const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userManager = require("../managers/user");

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
	try {
		await userManager.deleteUser(res.locals.userId);
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
