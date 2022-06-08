const { validationResult } = require("express-validator");

const handleError = require("../globalFunctions/handleError");
const { deletePostImage } = require("../globalFunctions/handleFile.js");

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

		try {
			if (isCreatingOrUpdatingPost(req) && req.file)
				await deletePostImage(req.file.filename);
		} catch (err) {
			handleError(err, res, "check request errors");
			return;
		}

		errorsArray.find(error => error.msg.status === 500)
			? res.status(500).json({ message: "Internal Server Error" })
			: res.status(400).json({ errors: errorsArray });

		return;
	}

	next();
};
