<template>
	<div>
		<h1>Profile<span v-if="notFound"> not found</span></h1>
		<div v-if="!notFound">
			<img :src="user.picture" alt="profile picture" />
			<span>Username: {{ user.username }}</span>
			<span>
				Creation date: {{ new Date(user.creationDate).toLocaleString() }}
			</span>
			<button v-if="login.userId == this.$route.params.id" @click="logout">
				Logout
			</button>
			<button
				v-if="login.userId == this.$route.params.id"
				@click="deleteAccount"
			>
				Delete account
			</button>
		</div>
		<router-link to="/">Home</router-link>
	</div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
	data() {
		return {
			notFound: false,
			user: {},
		};
	},
	methods: {
		...mapActions(["getOneUser"]),

		logout() {
			this.$store.dispatch("logout");
			this.$router.push("/login");
		},

		async deleteAccount() {
			if (!confirm("Do you really want to delete your account?")) return;

			try {
				const data = await this.$store.dispatch("deleteAccount");
				console.log(data);
			} catch (err) {
				console.error(err);
			}

			this.logout();
		},
	},
	computed: {
		...mapState(["login"]),
	},
	async created() {
		if (this.login.userId === -1) return this.$router.push("/login");

		try {
			this.user = await this.getOneUser(this.$route.params.id);
			this.user.picture = `/${this.user.picture}`;
		} catch (err) {
			switch (err.status) {
				case 401:
					this.$store.dispatch("logout");
					this.$router.push("/login");
					break;
				case 404:
					this.notFound = true;
					break;
				default:
			}
			console.error(err);
		}
	},
};
</script>

<style lang="scss" scoped>
div > * {
	display: block;

	& + * {
		margin-top: 0.5rem;
	}
}

img {
	height: 50px;
}
</style>
