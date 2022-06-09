<template>
	<div class="app-container">
		<header v-if="login.user.id !== -1">
			<router-link to="/">
				<img class="logo" src="/logo.svg" alt="Logo" />
			</router-link>
			<nav>
				<router-link
					class="profile-link"
					:to="{ name: 'profile', params: { id: login.user.id } }"
				>
					<img :src="userPictureSource" alt="" />
					<span>{{ login.user.username }}</span>
				</router-link>
			</nav>
		</header>
		<router-view />
		<footer v-if="login.user.id !== -1">
			© All rights reserved.<br />2022 - Maxime Kerfourn
		</footer>
	</div>
</template>

<script>
import { mapState } from "vuex";
import getUserPictureSource from "./getUserPictureSource.js";

export default {
	computed: {
		...mapState(["login", "apiRoot"]),

		userPictureSource() {
			return getUserPictureSource(this.apiRoot, this.login.user.picture);
		},
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
	background-color: $bg-color-2;
}

header {
	padding: 1rem 1.5rem;
	color: $txt-color-1;
	background-color: $bg-color-1;
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
		color: $txt-color-1;
	}
}

.profile-link {
	display: flex;
	align-items: center;
	gap: 0.375rem;
	padding: 0.25rem 0.375rem 0.25rem 0.25rem;
	position: relative;

	&::after {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		z-index: -1;
		background-color: lighten($bg-color-1, 10%);
		border-radius: 2rem;
		border-bottom-right-radius: 0;
		opacity: 0;
		transition: opacity 100ms;
	}

	&:hover {
		color: $contrast-color;

		&::after {
			opacity: 1;
		}
	}

	img {
		width: 2em;
		height: 2em;
		object-fit: cover;
		border-radius: 50%;
	}
}

footer {
	text-align: center;
	padding: 1rem;
	color: $txt-color-2;
	background-color: $bg-color-1;
	box-shadow: 0 -1px 2px rgba(0, 0, 0, 0.1);
	z-index: 0;
	font-size: 0.875rem;
}

h1 {
	margin-top: 0;
}
</style>
