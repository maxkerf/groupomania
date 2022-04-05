<template>
	<form @submit.prevent="addComment">
		<input type="text" name="text" id="text" v-model="text" />
		<button type="submit">Comment</button>
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
		addComment() {
			const comment = {
				text: this.text,
			};

			this.$emit("add-comment", comment);

			this.text = "";
		},
	},
};
</script>

<style lang="scss" scoped>
form {
	grid-column: 1 / -1;
	margin-top: 1rem;
	display: flex;
	gap: 0.5rem;
}
</style>
