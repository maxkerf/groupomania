const { validationResult } = require("express-validator");

module.exports = checkErrors = (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		errors.array().find(error => error.msg.status === 500)
			? res.status(500).json({ message: "Internal Server Error" })
			: res.status(400).json({ errors: errors.array() });
		return;
	}

	next();
};
