<template>
	<form @submit.prevent="submit">
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
import { mapActions, mapState } from "vuex";

export default {
	data() {
		return {
			email: "",
			password: "",
			username: "",
		};
	},
	computed: {
		...mapState(["token"]),
	},
	created() {
		if (this.token) this.$router.push("/");
	},
	methods: {
		...mapActions(["signup", "login"]),

		async submit() {
			const user = {
				email: this.email,
				password: this.password,
				username: this.username,
			};

			try {
				const signupData = await this.signup(user);
				console.log(signupData);

				await this.login(user);
				this.$router.push("/");
			} catch (err) {
				console.error(err);
			}
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
