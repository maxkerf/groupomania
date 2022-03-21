<template>
	<div>
		<nav v-if="login.userId !== -1">
			<router-link to="/">Home</router-link>
			<router-link :to="{ name: 'profile', params: { id: login.userId } }">
				Profile
			</router-link>
		</nav>
		<router-view />
	</div>
</template>

<script>
import { mapState } from "vuex";
export default {
	computed: {
		...mapState(["login"]),
	},
};
</script>

<style lang="scss">
#app {
	font-family: system-ui, sans-serif;
}

a {
	color: black;
	text-decoration: none;

	&.router-link-active {
		text-decoration: underline;
	}
}

h1 {
	margin-top: 0;
}

nav {
	display: flex;
	gap: 1rem;
	margin-bottom: 1rem;
}
</style>
