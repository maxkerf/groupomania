const fs = require("fs");

module.exports = async function deleteUserPicture(filename) {
	const path = `images/user/${filename}`;

	return new Promise((resolve, reject) => {
		fs.unlink(path, err => (err ? reject(err) : resolve()));
	});
};
