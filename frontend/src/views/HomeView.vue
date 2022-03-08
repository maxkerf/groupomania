<template>
	<div>
		<h1>Home</h1>
		<button @click="logout">Logout</button>
		<button @click="deleteAccount">Delete account</button>
	</div>
</template>

<script>
import { mapActions } from "vuex";

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
	async created() {
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
button + button {
	margin-left: 0.5rem;
}
</style>
