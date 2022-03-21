const fs = require("fs");

module.exports = async function deletePostImage(filename) {
	const path = `images/post/${filename}`;

	return new Promise((resolve, reject) => {
		fs.unlink(path, err => (err ? reject(err) : resolve()));
	});
};
