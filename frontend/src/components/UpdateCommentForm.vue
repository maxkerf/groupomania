<template>
	<form @submit.prevent="onFormSubmit" ref="form">
		<TextareaInputBox
			:text="text"
			:oldText="comment.text"
			:focus="true"
			@update-text="updateText"
		/>
		<SubmitCommentFormBtn />
	</form>
</template>

<script>
import TextareaInputBox from "./TextareaInputBox.vue";
import SubmitCommentFormBtn from "./SubmitCommentFormBtn.vue";

export default {
	props: {
		comment: {
			type: Object,
			required: true,
		},
	},

	data() {
		return {
			text: "",
		};
	},

	components: {
		TextareaInputBox,
		SubmitCommentFormBtn,
	},

	methods: {
		updateText(newText) {
			this.text = newText;
		},

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
