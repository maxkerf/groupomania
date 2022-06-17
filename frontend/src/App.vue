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
	overflow: hidden;
}

.app-container {
	font-family: system-ui, sans-serif;
	height: 100vh;
	overflow: hidden;
	display: grid;
	grid-template-rows: auto 1fr auto;
	background-color: $bg-color-2;
}

header {
	padding: 0.625rem 0.75rem;
	color: $txt-color-1;
	background-color: $bg-color-1;
	box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
	z-index: 1;
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 0.75rem;
}

.logo {
	width: 100%;
	height: 100%;
	max-width: 220px;
	vertical-align: middle;
}

nav {
	display: flex;
	gap: 1rem;

	a {
		text-decoration: unset;
		color: $txt-color-1;
	}
}

$profile-link-img-size: 40px;

.profile-link {
	display: flex;
	align-items: center;
	gap: 0.375rem;
	padding: 0.25rem;
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
		opacity: 0.5;
		transition: opacity 100ms;

		@media screen and (max-width: 400px) {
			opacity: 0;
		}
	}

	@media (any-hover: hover) {
		&:hover {
			color: $contrast-color;

			&::after {
				opacity: 1;
			}
		}
	}

	img {
		width: $profile-link-img-size;
		height: $profile-link-img-size;
		object-fit: cover;
		border-radius: 50%;
	}

	span {
		margin-right: 0.375rem;
		font-weight: 500;
		margin-top: -2px;

		@media screen and (max-width: 400px) {
			display: none;
		}
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
