<template>
	<div v-if="showModal" class="modal-box">
		<div @click="toggleModal(this)" class="modal-overlay"></div>
		<div class="modal">
			<button @click="toggleModal(this)" class="close-modal-btn" title="Close">
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
	props: ["toggleModal"],
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
}

.modal-overlay {
	background-color: rgba(0, 0, 0, 0.5);
	width: 100%;
	height: 100%;
}

.modal {
	background-color: #fff;
	position: absolute;
	padding: 1rem;
	border-radius: 0.5rem;
}

.close-modal-btn {
	position: absolute;
	right: 0.5rem;
	top: 0.5rem;
	border: unset;
	background-color: unset;
	font-size: unset;
	padding: 0;
	cursor: pointer;
	width: 1.5rem;
	aspect-ratio: 1;
	border-radius: 50%;
	display: grid;
	place-items: center;

	&:hover {
		background-color: #ddd;
	}
}
</style>
