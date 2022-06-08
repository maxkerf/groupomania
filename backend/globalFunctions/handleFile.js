const fs = require("fs");

function deleteImageFile(groupname, filename) {
	const path = `images/${groupname}/${filename}`;

	return new Promise((resolve, reject) => {
		fs.unlink(path, err => (err ? reject(err) : resolve()));
	});
}

exports.deleteUserPicture = function (filename) {
	return deleteImageFile("user", filename);
};

exports.deletePostImage = function (filename) {
	return deleteImageFile("post", filename);
};
