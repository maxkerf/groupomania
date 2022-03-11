<template>
	<div>
		<router-link v-if="login.userId === -1" to="/">Home</router-link>
		<h1>Not Found</h1>
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

<style lang="scss" scoped>
a {
	display: inline-block;
	margin-bottom: 1rem;
}
</style>
