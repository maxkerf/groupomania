<template>
	<form @submit.prevent="updateUser" ref="form">
		<label for="username">Username</label>
		<input
			id="username"
			type="text"
			v-model="username"
			required
			maxlength="30"
		/>
		<button type="submit">Save</button>
	</form>
</template>

<script>
export default {
	props: ["user"],
	data() {
		return {
			username: this.user.username,
		};
	},
	mounted() {
		this.$refs.form.querySelector("input").focus();
	},
	methods: {
		updateUser() {
			const newUser = { username: this.username };
			this.$emit("update-user", newUser);
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
