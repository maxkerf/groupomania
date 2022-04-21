<template>
	<div class="app-container">
		<header v-if="login.userId !== -1">
			<router-link to="/">
				<img class="logo" src="logo.svg" alt="Logo" />
			</router-link>
			<nav>
				<router-link :to="{ name: 'profile', params: { id: login.userId } }">
					Profile
				</router-link>
			</nav>
		</header>
		<router-view />
		<footer v-if="login.userId !== -1">
			© All rights reserved.<br />2022 - Maxime Kerfourn
		</footer>
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
	background-color: #515151;
}

header {
	padding: 1rem 1.5rem;
	color: #e4e6eb;
	background-color: #242526;
	box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
	z-index: 1;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.logo {
	height: 35px;
}

nav {
	display: flex;
	gap: 1rem;

	a {
		text-decoration: unset;
		color: #e4e6eb;

		&:hover {
			text-decoration: underline;
			color: #ffd7d7;
		}
	}
}

footer {
	text-align: center;
	padding: 1rem;
	color: #b0b3b8;
	background-color: #242526;
	box-shadow: 0 -1px 2px rgba(0, 0, 0, 0.1);
	z-index: 0;
	font-size: 0.875rem;
}

h1 {
	margin-top: 0;
}
</style>
