<template>
	<div class="reaction-box">
		<button
			@click="$emit('react', type)"
			:class="hasReacted ? classes[type] : ''"
		>
			<i :class="icons[type]"></i>
		</button>
		<span>{{ nbReactions }}</span>
	</div>
</template>

<script>
export default {
	data() {
		return {
			classes: ["disliked", "liked", "loved", "laughed"],
			icons: [
				"fa-solid fa-thumbs-down",
				"fa-solid fa-thumbs-up",
				"fa-solid fa-heart",
				"fa-solid fa-face-laugh-beam",
			],
		};
	},
	props: ["type", "postReactions", "userId"],
	computed: {
		hasReacted() {
			return Boolean(
				this.postReactions.find(
					reaction =>
						reaction.user_id === this.userId && reaction.type === this.type
				)
			);
		},

		nbReactions() {
			return this.postReactions.filter(reaction => reaction.type === this.type)
				.length;
		},
	},
};
</script>

<style lang="scss" scoped>
.reaction-box {
	display: flex;
	gap: 0.5rem;
}

.liked {
	color: blue;
}

.disliked {
	color: red;
}

.loved {
	color: deeppink;
}

.laughed {
	color: goldenrod;
}
</style>
