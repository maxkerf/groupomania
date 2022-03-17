const multer = require("multer");

const AUTHORIZED_EXTENSIONS = ["jpg", "jpeg", "png"];

function getExtension(file) {
	return file.mimetype.split("/")[1];
}

const storage = multer.diskStorage({
	destination: (req, file, cb) => cb(null, "images"),
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
				`Invalid picture (authorized extensions: ${AUTHORIZED_EXTENSIONS.join(
					"/"
				)})`
			)
		);

	cb(null, true);
};

module.exports = (req, res, next) => {
	const upload = multer({ storage, fileFilter }).single("picture");

	upload(req, res, err => {
		if (err)
			return res
				.status(400)
				.json(
					err instanceof multer.MulterError ? err : { message: err.message }
				);

		next();
	});
};
