<template>
	<form @submit.prevent="onSubmit">
		<label for="email">Email</label>
		<input id="email" type="email" v-model="email" />
		<label for="password">Password</label>
		<input id="password" type="password" v-model="password" />
		<label for="username">Username</label>
		<input id="username" type="text" v-model="username" />
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
		onSubmit() {
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
