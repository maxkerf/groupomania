<template>
	<form @submit.prevent="onFormSubmit">
		<TextareaInputBox
			v-model="text"
			:required="true"
			title="Add comment"
			placeholder="Add a comment"
		/>
		<SubmitCommentFormBtn />
	</form>
</template>

<script>
import TextareaInputBox from "../TextareaInputBox.vue";
import SubmitCommentFormBtn from "../SubmitCommentFormBtn.vue";

export default {
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
		onFormSubmit() {
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
	margin-top: 0.75rem;
	padding: 0 0.75rem 0.75rem 0.75rem;
	display: flex;
	gap: 0.5rem;

	& :nth-child(1) {
		flex: 1;
	}
}
</style>
