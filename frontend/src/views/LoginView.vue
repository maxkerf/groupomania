<template>
	<div class="login-view">
		<div class="login-box">
			<h1 class="title">Login</h1>
			<p class="info">
				No account yet? <router-link to="/signup">Signup</router-link>
			</p>
			<LoginForm
				@login="loginUser"
				:errorMessage="errorMessage"
				ref="loginForm"
			/>
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex";
import LoginForm from "../components/forms/LoginForm";
import { focusFirstInvalidFormInput } from "../formValidation.js";

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
		if (this.login.user.id !== -1) return this.$router.push("/");
	},

	methods: {
		async loginUser(user) {
			try {
				const data = await this.$store.dispatch("login", user);
				console.log(data);
				this.$router.push("/");
			} catch (err) {
				console.error(err);
				// if there are errors on the inputs
				if (err.errors) {
					err.errors?.forEach(e => {
						this.$refs.loginForm.errors[e.param] = `${e.msg}.`;
					});
					focusFirstInvalidFormInput(this.$refs.loginForm);
				} else {
					this.$refs.loginForm.errors.global = `${err.message}.`;
				}
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.login-view {
	height: 100vh;
	display: grid;
	place-items: center;
	padding: 0.75rem;
	box-sizing: border-box;
}

.login-box {
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
