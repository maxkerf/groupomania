<template>
	<form @submit.prevent="updatePost" ref="form">
		<label for="text">Text</label>
		<input id="text" type="text" v-model="text" maxlength="255" />
		<span class="text-counter">{{ text.length }}/255</span>
		<label for="image">Image</label>
		<input type="file" id="image" name="image" accept=".jpg,.jpeg,.png,.gif" />
		<button type="submit">Update Post</button>
	</form>
</template>

<script>
export default {
	props: ["post"],
	data() {
		return {
			text: "",
		};
	},
	created() {
		if (this.post.text) this.text = this.post.text;
	},
	mounted() {
		this.$refs.form.querySelector("input").focus();
	},
	methods: {
		updatePost() {
			const imageInput = this.$refs.form.querySelector("input[name='image']");

			const newPost = {
				text: this.text,
				image: imageInput.files[0],
			};

			this.$emit("update-post", this.post.id, newPost);
		},
	},
};
</script>

<style lang="scss" scoped>
form {
	display: grid;
	grid-template-rows: repeat(4, auto);
	grid-template-columns: repeat(2, auto);
	justify-content: start;

	label {
		grid-column: 1 / -1;
		justify-self: start;
		margin-bottom: 0.25rem;
	}

	.text-counter {
		margin-left: 0.5rem;
	}

	input[type="file"] {
		grid-column: 1 / -1;
	}

	button {
		margin-top: 1rem;
		justify-self: start;
	}
}
</style>
