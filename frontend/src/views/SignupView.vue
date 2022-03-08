<template>
	<div>
		<h1>Signup</h1>
		<p>Already among us? <router-link to="/login">Login</router-link></p>
		<SignupForm />
	</div>
</template>

<script>
import SignupForm from "../components/SignupForm";

export default {
	components: {
		SignupForm,
	},
};
</script>
