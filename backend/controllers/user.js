const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userManager = require("../managers/user");
const postManager = require("../managers/post");
const commentManager = require("../managers/comment");
const reactionManager = require("../managers/reaction");
const handleError = require("../globalFunctions/handleError");
const deleteUserPicture = require("../globalFunctions/deleteUserPicture");
const deletePostImage = require("../globalFunctions/deletePostImage");

async function deleteUserPosts(userId) {
	const userPosts = await postManager.getUserPosts(userId);
	for (const post of userPosts) {
		await reactionManager.deletePostReactions(post.id);
		await commentManager.deletePostComments(post.id);
		if (post.image) await deletePostImage(post.image);
		await postManager.deletePost(post.id);
	}
}

exports.signup = async (req, res) => {
	try {
		const hashedPassword = await bcrypt.hash(req.body.password, 10);

		const user = {
			email: req.body.email,
			username: req.body.username,
			password: hashedPassword,
		};

		await userManager.createUser(user);

		res.status(201).json({ message: "User signed up" });
	} catch (err) {
		handleError(err, res, "signup");
	}
};

exports.login = async (req, res) => {
	const errorObj = { message: "Wrong email or password" };

	try {
		const user = await userManager.getUserByEmail(req.body.email);
		if (!user) return res.status(400).json(errorObj);

		const isPasswordValid = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!isPasswordValid) return res.status(400).json(errorObj);

		const userId = user.id;
		const token = jwt.sign({ userId }, process.env.TOKEN_SECRET_KEY, {
			expiresIn: "10h",
		});

		const authenticatedUser = await userManager.getUserById(userId);
		res
			.status(200)
			.json({ message: "User logged in", token, user: authenticatedUser });
	} catch (err) {
		handleError(err, res, "login");
	}
};

exports.getOneUser = async (req, res) => {
	res.status(200).json(res.locals.user);
};

exports.updateUser = async (req, res) => {
	const userId = res.locals.user.id;
	const newUser = {
		username: req.body.username,
	};

	try {
		await userManager.updateUser(userId, newUser);
		res.status(200).json({ message: "User updated" });
	} catch (err) {
		handleError(err, res, "update user");
	}
};

exports.updateUserPicture = async (req, res) => {
	const user = res.locals.user;
	let newPicture = user.picture;

	try {
		if (req.file && !user.picture) {
			newPicture = req.file.filename;
		} else if (!req.file && user.picture) {
			await deleteUserPicture(user.picture);
			newPicture = null;
		} else if (req.file && user.picture) {
			if (req.file.originalname === user.picture) {
				await deleteUserPicture(req.file.filename);
			} else {
				await deleteUserPicture(user.picture);
				newPicture = req.file.filename;
			}
		}

		let response = { message: "User picture kept" };

		if (newPicture !== user.picture) {
			await userManager.updateUserPicture(user.id, newPicture);
			response = {
				message: "User picture updated",
				pictureUpdated: newPicture,
			};
		}

		res.status(200).json(response);
	} catch (err) {
		handleError(err, res, "update user picture");
	}
};

exports.deleteUser = async (req, res) => {
	const user = res.locals.user;

	try {
		await deleteUserPosts(user.id);
		await reactionManager.deleteUserReactions(user.id);
		await commentManager.deleteUserComments(user.id);
		if (user.picture) await deleteUserPicture(user.picture);
		await userManager.deleteUser(user.id);
		res.status(200).json({ message: "User deleted" });
	} catch (err) {
		handleError(err, res, "delete user");
	}
};
