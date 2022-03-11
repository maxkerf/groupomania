<template>
	<form @submit.prevent="onSubmit">
		<label for="text">Text</label>
		<input id="text" type="text" v-model="text" />
		<button type="submit">Add Post</button>
	</form>
</template>

<script>
export default {
	data() {
		return {
			text: "",
		};
	},
	methods: {
		async onSubmit() {
			const post = {
				text: this.text,
			};

			this.$emit("add-post", post);

			this.text = "";
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
