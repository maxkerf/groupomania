<template>
	<div>
		<nav>
			<router-link to="/signup">Signup</router-link>
			<router-link to="/login">Login</router-link>
		</nav>
		<router-view />
	</div>
</template>

<script>
export default {
	created() {
		document.title = "Groupomania";
	},
};
</script>

<style lang="scss">
nav > a + a {
	margin-left: 0.5rem;
}
</style>
