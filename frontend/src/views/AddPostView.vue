<template>
	<div>
		<h1>Add Post</h1>
		<form @submit.prevent="submit">
			<label for="text">Text</label>
			<input id="text" type="text" v-model="text" />
			<button type="submit">Add Post</button>
		</form>
	</div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
	data() {
		return {
			text: "",
		};
	},
	computed: {
		...mapState(["login"]),
	},
	created() {
		if (this.login.userId === -1) return this.$router.push("/login");
	},
	methods: {
		...mapActions(["addPost"]),

		async submit() {
			const post = {
				text: this.text,
			};

			try {
				const data = await this.addPost(post);
				console.log(data);
				this.$router.push("/posts");
			} catch (err) {
				console.error(err);
			}
		},
	},
};
</script>

<style lang="scss" scoped>
form > * {
	display: block;
}

button {
	margin-top: 1rem;
}
</style>
