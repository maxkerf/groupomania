<template>
	<form @submit.prevent="signup">
		<label for="email">Email</label>
		<input id="email" type="email" v-model="email" required maxlength="50" />
		<label for="password">Password</label>
		<input
			id="password"
			type="password"
			v-model="password"
			required
			maxlength="30"
		/>
		<label for="username">Username</label>
		<input
			id="username"
			type="text"
			v-model="username"
			required
			maxlength="30"
		/>
		<button type="submit">Signup</button>
	</form>
</template>

<script>
export default {
	data() {
		return {
			email: "",
			password: "",
			username: "",
		};
	},
	methods: {
		signup() {
			const user = {
				email: this.email,
				password: this.password,
				username: this.username,
			};

			this.$emit("signup", user);
		},
	},
};
</script>

<style lang="scss" scoped>
form > * {
	display: block;
}

button {
	margin-top: 1rem;
}
</style>
