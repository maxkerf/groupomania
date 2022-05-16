<template>
	<div v-if="showModal" class="modal-box">
		<div @click="toggleModal(this)" class="modal-overlay"></div>
		<div class="modal">
			<span class="modal-title">{{ title }}</span>
			<button
				@click="toggleModal(this)"
				class="close-modal-btn"
				title="Close modal"
			>
				<i class="fa-solid fa-xmark"></i>
			</button>
			<slot></slot>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			showModal: false,
		};
	},
	props: {
		title: {
			type: String,
			required: true,
			default: "Title",
		},
		toggleModal: Function,
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
}

.modal-overlay {
	background-color: rgba(0, 0, 0, 0.75);
	width: 100%;
	height: 100%;
}

.modal {
	background-color: #242526;
	color: #e4e6eb;
	position: absolute;
	padding: 1rem;
	border: 3px solid lighten(#242526, 10%);
	border-radius: 0.5rem;
	min-width: 250px;
	max-width: 400px;
	max-height: 90%;
	overflow: hidden auto;
	display: grid;
	gap: 1rem;
}

.modal-title {
	font-weight: 500;
	display: block;
	text-align: center;
	justify-self: center;
	width: calc(100% - 4em);
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
		background-color: lighten(#242526, 10%);
		width: 100%;
		height: 100%;
		border-radius: 50%;
		z-index: -1;
		opacity: 0;
		transition: opacity 100ms;
	}

	&:hover::after {
		opacity: 1;
	}
}
</style>
3
