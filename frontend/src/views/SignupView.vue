<template>
	<div class="signup-view">
		<div class="signup-box">
			<h1 class="title">Signup</h1>
			<p class="info">
				Already among us? <router-link to="/login">Login</router-link>
			</p>
			<SignupForm @signup="signup" ref="signupForm" />
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex";
import SignupForm from "../components/forms/SignupForm";
import { focusFirstInvalidFormInput } from "../formValidation.js";

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
				err.errors.forEach(e => {
					this.$refs.signupForm.errors[e.param] = `${e.msg}.`;
				});
				focusFirstInvalidFormInput(this.$refs.signupForm);
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.signup-view {
	height: 100vh;
	display: grid;
	place-items: center;
	padding: 0.75rem;
	box-sizing: border-box;
}

.signup-box {
	width: 100%;
	max-width: 310px;
	box-sizing: border-box;
	background-color: $bg-color-1;
	color: $txt-color-1;
	padding: 1rem 1.5rem;
	border-radius: 0.75rem;
	display: flex;
	flex-direction: column;
	gap: 0.75rem;
}

.title {
	margin: 0;
	text-align: center;
}

.info {
	margin: 0;
	text-align: center;

	a {
		text-decoration: unset;
		color: unset;

		@media (any-hover: hover) {
			&:hover {
				text-decoration: underline;
				color: $contrast-color;
			}
		}
	}
}
</style>
