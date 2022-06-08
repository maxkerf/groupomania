const multer = require("multer");

const AUTHORIZED_EXTENSIONS = ["jpg", "jpeg", "png"];
const MAX_FILE_SIZE = 1024 * 1024; // 1Mo

function getExtension(file) {
	return file.mimetype.split("/")[1];
}

const storage = multer.diskStorage({
	destination: (req, file, cb) => cb(null, "images/user"),
	filename: (req, file, cb) => {
		const currentTime = Date.now();
		const randomNumber = Math.random().toString().slice(2);
		let extension = getExtension(file);
		if (extension === "jpeg") extension = "jpg";

		cb(null, `user_picture_${currentTime}${randomNumber}.${extension}`);
	},
});

const fileFilter = (req, file, cb) => {
	const extension = getExtension(file);

	if (!AUTHORIZED_EXTENSIONS.includes(extension))
		return cb(
			Error(
				`Invalid picture extension (authorized extensions: ${AUTHORIZED_EXTENSIONS.join(
					"/"
				)})`
			)
		);

	cb(null, true);
};

module.exports = (req, res, next) => {
	const upload = multer({
		storage,
		fileFilter,
		limits: { fileSize: MAX_FILE_SIZE },
	}).single("picture");

	upload(req, res, err => {
		if (err) {
			const response = {
				errors: [
					{
						msg:
							err instanceof multer.MulterError
								? "Invalid image size (> 1Mo)"
								: err.message,
						param: "image",
					},
				],
			};

			return res.status(400).json(response);
		}

		next();
	});
};
