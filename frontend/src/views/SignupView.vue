<template>
	<div>
		<h1>Signup</h1>
		<p>Already among us? <router-link to="/login">Login</router-link></p>
		<SignupForm @signup="signup" />
	</div>
</template>

<script>
import { mapState } from "vuex";
import SignupForm from "../components/SignupForm";

export default {
	components: {
		SignupForm,
	},
	computed: {
		...mapState(["login"]),
	},
	created() {
		if (this.login.userId !== -1) return this.$router.push("/");
	},
	methods: {
		async signup(user) {
			try {
				const signupData = await this.$store.dispatch("signup", user);
				console.log(signupData);
				await this.$store.dispatch("login", user);
				this.$router.push("/");
			} catch (err) {
				console.error(err);
			}
		},
	},
};
</script>
