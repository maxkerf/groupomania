const jwt = require("jsonwebtoken");

module.exports = authenticateUser = (req, res, next) => {
	try {
		const token = req.headers.authorization?.split(" ")[1];
		const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET_KEY);

		res.locals.userId = decodedToken.userId;

		next();
	} catch (err) {
		res.status(401).json(err);
	}
};
