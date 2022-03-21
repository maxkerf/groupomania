<template>
	<form
		v-show="updatingPicture"
		v-if="login.userId == this.$route.params.id"
		@submit.prevent="updateUserPicture"
	>
		<label for="picture">Picture</label>
		<input id="picture" type="file" required accept=".jpg,.jpeg,.png" />
		<button type="submit">Save</button>
	</form>
</template>

<script>
import { mapState } from "vuex";

export default {
	props: ["updatingPicture"],
	computed: {
		...mapState(["login"]),
	},
	methods: {
		updateUserPicture() {
			const pictureInput = document.querySelector("#picture");
			this.$emit("update-user-picture", pictureInput.files[0]);
			pictureInput.value = "";
		},
	},
};
</script>

<style lang="scss" scoped>
form {
	border-left: 2px solid;
	padding-left: 0.25rem;

	& > * {
		display: block;
	}

	button {
		margin-top: 0.25rem;
	}
}
</style>
