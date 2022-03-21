module.exports = parseBodyFromMulter = (req, res, next) => {
	req.body = req.body.post ? JSON.parse(req.body.post) : {};
	next();
};
