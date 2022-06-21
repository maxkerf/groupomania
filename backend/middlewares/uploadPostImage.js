const multer = require("multer");

const AUTHORIZED_TYPES = ["jpg", "jpeg", "png", "gif"];
const MAX_FILE_SIZE = 1024 * 1024; // 1Mo

function getExtension(file) {
	return file.mimetype.split("/")[1];
}

const storage = multer.diskStorage({
	destination: (req, file, cb) => cb(null, "images/post"),
	filename: (req, file, cb) => {
		const currentTime = Date.now();
		const randomNumber = Math.random().toString().slice(2);
		let extension = getExtension(file);
		if (extension === "jpeg") extension = "jpg";

		cb(null, `post_image_${currentTime}${randomNumber}.${extension}`);
	},
});

const fileFilter = (req, file, cb) => {
	const extension = getExtension(file);

	if (!AUTHORIZED_TYPES.includes(extension))
		return cb(
			Error(
				`Invalid file type (authorized extensions: ${AUTHORIZED_TYPES.join(
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
	}).single("image");

	upload(req, res, err => {
		if (err) {
			const response = {
				errors: [
					{
						msg:
							err instanceof multer.MulterError
								? "Invalid file size (> 1Mo)"
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
