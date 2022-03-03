const bcrypt = require("bcrypt");

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
