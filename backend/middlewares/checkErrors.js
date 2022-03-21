const { validationResult } = require("express-validator");

const deletePostImage = require("../globalFunctions/deletePostImage");

module.exports = checkErrors = async (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		const errorsArray = errors.array();

		if (req.baseUrl.includes("posts") && req.method === "POST")
			await deletePostImage(req.file.filename);

		errorsArray.find(error => error.msg.status === 500)
			? res.status(500).json({ message: "Internal Server Error" })
			: res.status(400).json({ errors: errorsArray });

		return;
	}

	next();
};
