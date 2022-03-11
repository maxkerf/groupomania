<template>
	<h1>Home</h1>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
	methods: {
		...mapActions(["apiRoot"]),
	},
	computed: {
		...mapState(["login"]),
	},
	async created() {
		if (this.login.userId === -1) return this.$router.push("/login");

		try {
			const data = await this.apiRoot();
			console.log(data);
		} catch (err) {
			console.error(err);
			this.$store.dispatch("logout");
			this.$router.push("/login");
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
