<template>
	<form @submit.prevent="updateComment">
		<input @blur="$emit('blur')" type="text" v-model="text" ref="input" />
	</form>
</template>

<script>
export default {
	props: ["comment"],
	data() {
		return {
			text: this.comment.text,
		};
	},
	mounted() {
		this.$refs.input.focus();
	},
	methods: {
		updateComment() {
			const newComment = {
				text: this.text,
			};

			this.$emit("update-comment", newComment);
		},
	},
};
</script>

<style lang="scss" scoped>
input {
	background: unset;
	border: unset;
	font-size: unset;
}
</style>
