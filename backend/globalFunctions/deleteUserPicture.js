const fs = require("fs");

module.exports = async function deleteUserPicture(filename) {
	const path = `images/user/${filename}`;

	return new Promise((resolve, reject) => {
		if (filename === "user.svg") return resolve();
		fs.unlink(path, err => (err ? reject(err) : resolve()));
	});
};
