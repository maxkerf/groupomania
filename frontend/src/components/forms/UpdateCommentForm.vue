<template>
	<form @submit.prevent="onFormSubmit" ref="form">
		<TextareaInputBox v-model="text" :focus="true" :required="true" />
		<SubmitCommentFormBtn />
	</form>
</template>

<script>
import TextareaInputBox from "../TextareaInputBox.vue";
import SubmitCommentFormBtn from "../SubmitCommentFormBtn.vue";

export default {
	props: {
		comment: {
			type: Object,
			required: true,
		},
	},

	data() {
		return {
			text: this.comment.text,
		};
	},

	components: {
		TextareaInputBox,
		SubmitCommentFormBtn,
	},

	methods: {
		onFormSubmit() {
			const newComment = {
				text: this.text,
			};

			this.$emit("update-comment", newComment);
		},
	},
};
</script>

<style lang="scss" scoped>
form {
	display: flex;
	gap: 0.5rem;

	& :nth-child(1) {
		flex: 1;
	}
}
</style>
