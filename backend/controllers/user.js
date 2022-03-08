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
			expiresIn: "10s",
		});

		res.status(200).json({ token });
	} catch (err) {
		console.error(`Failed to login ✖\n${err}`);
		res.sendStatus(500);
	}
};
