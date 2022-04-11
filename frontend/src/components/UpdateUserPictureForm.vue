<template>
	<form @submit.prevent="updateUserPicture">
		<label for="picture">Picture</label>
		<input id="picture" type="file" required accept=".jpg,.jpeg,.png" />
		<button type="submit">Save</button>
	</form>
</template>

<script>
export default {
	methods: {
		updateUserPicture() {
			const pictureInput = document.querySelector("#picture");
			this.$emit("update-user-picture", pictureInput.files[0]);
		},
	},
};
</script>

<style lang="scss" scoped>
form {
	& > * {
		display: block;
	}

	input {
		margin-top: 0.25rem;
	}

	button {
		margin-top: 1rem;
	}
}
</style>
