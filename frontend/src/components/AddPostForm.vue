<template>
	<form @submit.prevent="onFormSubmit" ref="form">
		<TextareaInputBox :text="text" :focus="true" @update-text="updateText" />
		<ImageInputBox :image="image" @update-image="updateImage" />
		<SubmitFormBtn>Post</SubmitFormBtn>
	</form>
</template>

<script>
import TextareaInputBox from "./TextareaInputBox.vue";
import ImageInputBox from "./ImageInputBox.vue";
import SubmitFormBtn from "./SubmitFormBtn.vue";

export default {
	data() {
		return {
			text: "",
			image: null,
		};
	},

	components: {
		TextareaInputBox,
		ImageInputBox,
		SubmitFormBtn,
	},

	methods: {
		updateText(newText) {
			this.text = newText;
		},

		updateImage(newImage) {
			this.image = newImage;
		},

		onFormSubmit() {
			const post = {
				text: this.text,
				image: this.image,
			};

			this.$emit("add-post", post);
		},
	},
};
</script>

<style lang="scss" scoped>
form {
	display: flex;
	flex-direction: column;
	gap: 1rem;
}
</style>
