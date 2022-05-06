<template>
	<div class="signup-view">
		<div class="signup-box">
			<h1 class="title">Signup</h1>
			<p class="info">
				Already among us? <router-link to="/login">Login</router-link>
			</p>
			<SignupForm @signup="signup" />
		</div>
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
		if (this.login.user.id !== -1) return this.$router.push("/");
	},
	methods: {
		async signup(user) {
			try {
				const signupData = await this.$store.dispatch("signup", user);
				console.log(signupData);
				const loginData = await this.$store.dispatch("login", user);
				console.log(loginData);
				this.$router.push("/");
			} catch (err) {
				console.error(err);
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.signup-view {
	height: 100vh;
}

.signup-box {
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
	top: 25%;
	background-color: #242526;
	color: #e4e6eb;
	padding: 1rem 1.5rem;
	border-radius: 0.75rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 0.75rem;
}

.title {
	margin: 0;
}

.info {
	margin: 0;

	a {
		text-decoration: unset;
		color: unset;

		&:hover {
			text-decoration: underline;
			color: #ffd7d7;
		}
	}
}
</style>
