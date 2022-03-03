<template>
	<form @submit.prevent="submitForm">
		<label for="email">Email</label>
		<input id="email" type="text" v-model="email" />
		<label for="password">Password</label>
		<input id="password" type="password" v-model="password" />
		<label for="username">Username</label>
		<input id="username" type="text" v-model="username" />
		<button type="submit">Signup</button>
	</form>
</template>

<script>
import { mapState } from "vuex";

export default {
	data() {
		return {
			email: "",
			password: "",
			username: "",
		};
	},
	computed: {
		...mapState({
			apiRoot: "apiRoot",
		}),
	},
	methods: {
		async submitForm() {
			const user = {
				email: this.email,
				password: this.password,
				username: this.username,
			};

			const data = await this.signup(user);

			alert(data.message);
		},

		async signup(user) {
			const res = await fetch(`${this.apiRoot}/signup`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(user),
			});
			const data = await res.json();

			return data;
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
