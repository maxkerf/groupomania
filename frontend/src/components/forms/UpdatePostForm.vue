<template>
	<form @submit.prevent="onFormSubmit">
		<TextareaInputBox
			:text="text"
			:oldText="post.text"
			:focus="true"
			@update-text="updateText"
		/>
		<ImageInputBox
			:image="image"
			:oldImage="post.image"
			updatedImageGroup="post"
			@update-image="updateImage"
		/>
		<SubmitFormBtn>Save</SubmitFormBtn>
	</form>
</template>

<script>
import TextareaInputBox from "../TextareaInputBox.vue";
import ImageInputBox from "../ImageInputBox.vue";
import SubmitFormBtn from "../SubmitFormBtn.vue";

export default {
	props: ["post"],

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
			const newPost = {
				text: this.text,
				image: this.image,
			};

			this.$emit("update-post", this.post.id, newPost);
		},
	},
};
</script>

<style lang="scss" scoped>
form {
	display: flex;
	flex-direction: column;
	gap: 1rem;
	align-items: center;
}
</style>
