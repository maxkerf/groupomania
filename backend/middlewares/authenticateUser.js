const jwt = require("jsonwebtoken");
const userManager = require("../managers/user");

module.exports = authenticateUser = async (req, res, next) => {
	try {
		// verify the token
		const token = req.headers.authorization?.split(" ")[1];
		const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
		const userId = decodedToken.userId;

		// check if the user still exists
		const user = await userManager.getUserById(userId);
		if (!user) throw { message: "User doesn't exist anymore" };

		res.locals.userId = userId;
		next();
	} catch (err) {
		res.status(401).json(err);
	}
};
