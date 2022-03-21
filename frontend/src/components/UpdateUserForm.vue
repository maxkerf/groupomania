<template>
	<form
		v-show="updating"
		v-if="login.userId == this.$route.params.id"
		@submit.prevent="updateUser"
	>
		<label for="username">Username</label>
		<input
			id="username"
			type="text"
			:value="user.username"
			required
			maxlength="30"
		/>
		<button type="submit">Save</button>
	</form>
</template>

<script>
import { mapState } from "vuex";

export default {
	props: ["updating", "user"],
	computed: {
		...mapState(["login"]),
	},
	methods: {
		updateUser() {
			const username = document.querySelector("#username").value;
			const newUser = { username };

			this.$emit("update-user", newUser);
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
