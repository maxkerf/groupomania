<template>
	<div class="reaction-box">
		<button
			@click="$emit('react', type)"
			:class="`reaction-btn ${hasReacted ? hasReactedClasses[type] : ''}`"
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
			hasReactedClasses: ["disliked", "liked", "loved", "laughed"],
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
	gap: 0.25rem;
	align-items: center;

	span {
		font-size: 0.875rem;
	}
}

.reaction-btn {
	border: unset;
	background-color: unset;
	padding: unset;
	cursor: pointer;
	color: #e4e6eb;
	font-size: 1.25rem;

	display: grid;
	place-items: center;
	width: 1.375em;
	height: 1.375em;
	border-radius: 25%;

	position: relative;
	z-index: 0;

	&::after {
		content: "";
		position: absolute;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		border-radius: inherit;
		background-color: #515151;
		z-index: -1;
		opacity: 0;
		transition: opacity 100ms;
	}

	&:hover::after {
		opacity: 1;
	}
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
