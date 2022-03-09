<template>
	<div>
		<h1>Home</h1>
		<router-link to="/add-post">Add a post</router-link>
		<router-link to="/posts">Show posts</router-link>
		<button @click="logout">Logout</button>
		<button @click="deleteAccount">Delete account</button>
	</div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
	methods: {
		...mapActions(["apiRoot"]),

		logout() {
			this.$store.dispatch("logout");
			this.$router.push("/login");
		},

		async deleteAccount() {
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
		...mapState(["token"]),
	},
	async created() {
		if (!this.token) this.$router.push("/login");

		try {
			const data = await this.apiRoot();
			console.log(data);
		} catch (err) {
			console.error(err);
			this.logout();
		}
	},
};
</script>

<style lang="scss" scoped>
div > * {
	display: block;

	& + * {
		margin-top: 1rem;
	}
}
</style>
