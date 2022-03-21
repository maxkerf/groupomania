<template>
	<form @submit.prevent="addPost">
		<label for="text">Text</label>
		<input id="text" type="text" v-model="text" required maxlength="255" />
		<span class="text-counter">{{ text.length }}/255</span>
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
		addPost() {
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
form {
	display: grid;
	grid-template-rows: repeat(3, auto);
	grid-template-columns: repeat(2, auto);
	justify-items: start;
	justify-content: start;

	label {
		grid-column: 1 / 3;
	}

	.text-counter {
		margin-left: 0.5rem;
	}

	button {
		margin-top: 1rem;
	}
}
</style>
