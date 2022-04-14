const reactionManager = require("../managers/reaction");
const handleError = require("../globalFunctions/handleError");

exports.react = async (req, res) => {
	const newReaction = {
		user_id: res.locals.authenticatedUser.id,
		post_id: res.locals.post.id,
		type: req.body.type,
	};

	try {
		let message = "";

		const reaction = await reactionManager.reactionExists(newReaction);

		if (!reaction) {
			await reactionManager.addReaction(newReaction);
			message = "Post reaction added";
		} else {
			if (reaction.type === newReaction.type) {
				await reactionManager.removeReaction(reaction.id);
				message = "Post reaction removed";
			} else {
				await reactionManager.updateReaction(reaction.id, newReaction.type);
				message = "Post reaction updated";
			}
		}

		res.status(200).json({ message });
	} catch (err) {
		handleError(err, res, "react");
	}
};

exports.getOnePostReactions = async (req, res) => {
	try {
		const reactions = await reactionManager.getOnePostReactions(
			res.locals.post.id
		);
		res.status(200).json(reactions);
	} catch (err) {
		handleError(err, res, "get one post reactions");
	}
};
