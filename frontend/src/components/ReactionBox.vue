<template>
	<div class="reaction-box">
		<button
			@click="$emit('react', type)"
			:class="`reaction-btn ${hasReacted ? hasReactedClasses[type] : ''}`"
			:title="titles[type]"
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
			titles: ["Dislike", "Like", "Love", "Laugh"],
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
	color: $txt-color-1;
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
		background-color: lighten($bg-color-1, 10%);
		z-index: -1;
		opacity: 0;
		transition: opacity 100ms;
	}

	@media (any-hover: hover) {
		&:hover::after {
			opacity: 1;
		}
	}
}

@keyframes liked {
	to {
		transform: rotate(-10deg) translateY(-1px) scale(1.1);
	}
}

.liked {
	color: $liked-color;
	animation: liked 0.3s;
}

@keyframes disliked {
	to {
		transform: rotate(10deg) translateY(1px) scale(1.1);
	}
}

.disliked {
	color: $disliked-color;
	animation: disliked 0.3s;
}

@keyframes loved {
	25% {
		transform: scale(1.1);
	}
	50% {
		transform: scale(1);
	}
	75% {
		transform: scale(1.1);
	}
}

.loved {
	color: $loved-color;
	animation: loved 0.3s;
}

@keyframes laughed {
	25% {
		transform: rotate(-10deg);
	}
	50% {
		transform: rotate(0);
	}
	75% {
		transform: rotate(10deg);
	}
}

.laughed {
	color: $laughed-color;
	animation: laughed 0.3s;
}
</style>
