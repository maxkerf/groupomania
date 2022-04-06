const { validationResult } = require("express-validator");

const deletePostImage = require("../globalFunctions/deletePostImage");

function isCreatingOrUpdatingPost(req) {
	return (
		req.baseUrl.includes("posts") &&
		(req.method === "POST" || req.method === "PUT")
	);
}

module.exports = checkErrors = async (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		const errorsArray = errors.array();

		if (isCreatingOrUpdatingPost(req) && req.file)
			await deletePostImage(req.file.filename);

		errorsArray.find(error => error.msg.status === 500)
			? res.status(500).json({ message: "Internal Server Error" })
			: res.status(400).json({ errors: errorsArray });

		return;
	}

	next();
};
