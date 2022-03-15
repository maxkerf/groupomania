const multer = require("multer");

const storage = multer.diskStorage({
	destination: (req, file, cb) => cb(null, "images"),
	filename: (req, file, cb) => cb(null, file.originalname),
});

module.exports = (req, res, next) => {
	const upload = multer({ storage }).single("picture");

	upload(req, res, error => {
		if (error) return res.status(400).json({ message: error.message });

		next();
	});
};
