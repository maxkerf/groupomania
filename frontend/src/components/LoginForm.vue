<template>
	<form @submit.prevent="submit">
		<label for="email">Email</label>
		<input id="email" type="email" v-model="email" />
		<label for="password">Password</label>
		<input id="password" type="password" v-model="password" />
		<button type="submit">Login</button>
	</form>
</template>

<script>
import { mapState } from "vuex";

export default {
	data() {
		return {
			email: "",
			password: "",
		};
	},
	computed: {
		...mapState(["apiRoot"]),
	},
	methods: {
		async submit() {
			const user = {
				email: this.email,
				password: this.password,
			};

			const data = await this.login(user);

			console.log(data);
			if (data.token) {
				localStorage.setItem("token", data.token);
				window.location = "/";
			}
		},

		async login(user) {
			const res = await fetch(`${this.apiRoot}/login`, {
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
