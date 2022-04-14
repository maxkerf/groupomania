<template>
	<div class="app-container">
		<nav v-if="login.userId !== -1">
			<router-link to="/">Home</router-link>
			<router-link :to="{ name: 'profile', params: { id: login.userId } }">
				Profile
			</router-link>
		</nav>
		<router-view />
		<footer v-if="login.userId !== -1">Footer example</footer>
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
body {
	margin: 0;
}

.app-container {
	font-family: system-ui, sans-serif;
	height: 100vh;
	display: grid;
	grid-template-rows: auto 1fr auto;
}

nav {
	display: flex;
	gap: 1rem;
	padding: 1rem;
	background-color: #aaa;
}

footer {
	text-align: center;
	padding: 1rem;
	background-color: #aaa;
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
</style>
