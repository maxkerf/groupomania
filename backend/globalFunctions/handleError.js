module.exports = function (err, res, requestName = "accomplish request") {
	console.error(`Failed to ${requestName} ✖\n${err}`);
	res.status(500).json({ message: "Internal Server Error" });
};
