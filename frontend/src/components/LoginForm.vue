<template>
	<form @submit.prevent="login">
		<label for="email">Email</label>
		<input v-model="email" id="email" type="email" required />
		<label for="password">Password</label>
		<input id="password" type="password" v-model="password" required />
		<p>{{ errorMessage }}</p>
		<button type="submit">Login</button>
	</form>
</template>

<script>
export default {
	data() {
		return {
			email: "",
			password: "",
		};
	},
	props: ["errorMessage"],
	methods: {
		login() {
			const user = {
				email: this.email,
				password: this.password,
			};

			this.$emit("login", user);
		},
	},
};
</script>

<style lang="scss" scoped>
form > * {
	display: block;
}
</style>
