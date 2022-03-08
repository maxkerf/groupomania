<template>
	<div>
		<h1>Login</h1>
		<p>No account yet? <router-link to="/signup">Signup</router-link></p>
		<LoginForm />
	</div>
</template>

<script>
import LoginForm from "../components/LoginForm";

export default {
	components: {
		LoginForm,
	},
};
</script>
