<template>
	<form @submit.prevent="submit">
		<label for="email">Email</label>
		<input v-model="email" id="email" type="email" />
		<label for="password">Password</label>
		<input id="password" type="password" v-model="password" />
		<p>{{ errorMessage }}</p>
		<button type="submit">Login</button>
	</form>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
	data() {
		return {
			email: "",
			password: "",
			errorMessage: "",
		};
	},
	computed: {
		...mapState(["token"]),
	},
	created() {
		if (this.token) this.$router.push("/");
	},
	methods: {
		...mapActions(["login"]),

		async submit() {
			const user = {
				email: this.email,
				password: this.password,
			};

			try {
				await this.login(user);
				this.$router.push("/");
			} catch (err) {
				this.errorMessage = err.message;
			}
		},
	},
};
</script>

<style lang="scss" scoped>
form > * {
	display: block;
}
</style>
