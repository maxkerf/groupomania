<template>
	<div class="login-view">
		<div class="login-box">
			<h1 class="title">Login</h1>
			<p class="info">
				No account yet? <router-link to="/signup">Signup</router-link>
			</p>
			<LoginForm @login="loginUser" :errorMessage="errorMessage" />
		</div>
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
				this.errorMessage = err.message;
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.login-view {
	height: 100vh;
}

.login-box {
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
