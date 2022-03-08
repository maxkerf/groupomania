<template>
	<div>
		<h1>Home</h1>
		<button @click="logout">Logout</button>
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
