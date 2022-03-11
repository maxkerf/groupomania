<template>
	<div>
		<h1>Login</h1>
		<p>No account yet? <router-link to="/signup">Signup</router-link></p>
		<LoginForm @login="loginUser" :errorMessage="errorMessage" />
	</div>
</template>

<script>
import { mapState } from "vuex";
import LoginForm from "../components/LoginForm";

export default {
	data() {
		return {
			errorMessage: "",
		};
	},
	components: {
		LoginForm,
	},
	computed: {
		...mapState(["login"]),
	},
	created() {
		if (this.login.userId !== -1) return this.$router.push("/");
	},
	methods: {
		async loginUser(user) {
			try {
				await this.$store.dispatch("login", user);
				this.$router.push("/");
			} catch (err) {
				this.errorMessage = err.message;
			}
		},
	},
};
</script>
