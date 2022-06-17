<template>
	<Transition name="modal-box">
		<div v-if="isShown" class="modal-box">
			<div @click="toggle" class="modal-overlay"></div>
			<div class="modal" ref="modal">
				<span class="modal-title">{{ title }}</span>
				<button @click="toggle" class="close-modal-btn" title="Close modal">
					<i class="fa-solid fa-xmark"></i>
				</button>
				<slot></slot>
			</div>
		</div>
	</Transition>
</template>

<script>
export default {
	data() {
		return {
			isShown: false,
		};
	},

	props: {
		title: {
			type: String,
			default: "Title",
		},
	},

	watch: {
		isShown() {
			if (this.isShown === false) this.$refs.modal.classList.add("hide");
		},
	},

	methods: {
		toggle() {
			this.isShown = !this.isShown;
		},
	},
};
</script>

<style lang="scss" scoped>
.modal-box {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	display: grid;
	place-items: center;
	z-index: 10;

	&-enter-active {
		transition: opacity 0.4s;
	}

	&-leave-active {
		transition: opacity 0.3s 0.1s;
	}

	&-enter-from,
	&-leave-to {
		opacity: 0;
	}
}

.modal-overlay {
	background-color: $overlay-color-dark;
	width: 100%;
	height: 100%;
}

/* Modal */

@keyframes show-modal {
	from {
		transform: translateY(-10%);
	}
}

@keyframes hide-modal {
	to {
		transform: translateY(10%);
	}
}

.modal {
	background-color: $bg-color-1;
	color: $txt-color-1;
	position: absolute;
	padding: 1rem;
	border: 3px solid lighten($bg-color-1, 10%);
	border-radius: 0.5rem;
	box-sizing: border-box;
	max-width: 90%;
	max-height: 90%;
	overflow: hidden auto;
	display: grid;
	gap: 1rem;
	animation: 0.3s 0.1s show-modal ease-out backwards;

	&.hide {
		animation: 0.3s hide-modal ease-in forwards;
	}
}

.modal-title {
	font-weight: 500;
	text-align: center;
	padding: 0 2em;
}

.close-modal-btn {
	border: unset;
	background-color: unset;
	font-size: unset;
	padding: unset;
	color: unset;
	position: absolute;
	right: 0.5em;
	top: 0.5em;
	cursor: pointer;
	width: 1.5em;
	height: 1.5em;
	display: grid;
	place-items: center;
	z-index: 0;

	&::after {
		content: "";
		position: absolute;
		background-color: lighten($bg-color-1, 10%);
		width: 100%;
		height: 100%;
		border-radius: 50%;
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
</style>
