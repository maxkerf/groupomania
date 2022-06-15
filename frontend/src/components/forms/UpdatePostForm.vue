<template>
	<form novalidate @submit.prevent="onFormSubmit">
		<TextareaInputBox v-model="text" title="post text" :focus="true" />
		<FormErrorMessageContainer :errorMessage="errors.text" />
		<ImageInputBox
			:image="image"
			:oldImage="post.image"
			updatedImageGroup="post"
			@update-image="updateImage"
		/>
		<FormErrorMessageContainer :errorMessage="errors.image" />
		<FormErrorMessageContainer :errorMessage="errors.global" :isGlobal="true" />
		<SubmitFormBtn>Save</SubmitFormBtn>
	</form>
</template>

<script>
import TextareaInputBox from "../TextareaInputBox.vue";
import ImageInputBox from "../ImageInputBox.vue";
import SubmitFormBtn from "../SubmitFormBtn.vue";
import FormErrorMessageContainer from "../FormErrorMessageContainer.vue";
import {
	checkFormInputs,
	focusFirstInvalidFormInput,
} from "../../formValidation.js";

export default {
	name: "UpdatePostForm",

	props: ["post"],

	data() {
		return {
			text: "",
			image: null,
			errors: {
				text: "",
				image: "",
				global: "",
			},
		};
	},

	components: {
		TextareaInputBox,
		ImageInputBox,
		SubmitFormBtn,
		FormErrorMessageContainer,
	},

	created() {
		if (this.post.text) this.text = this.post.text;
	},

	methods: {
		updateImage(newImage) {
			this.image = newImage;
		},

		resetErrors() {
			for (const key in this.errors) this.errors[key] = "";
		},

		onFormSubmit(e) {
			this.resetErrors();
			checkFormInputs(this);
			focusFirstInvalidFormInput(this);

			if (e.target.checkValidity()) {
				const newPost = {
					text: this.text,
					image: this.image,
				};

				this.$emit("update-post", this.post.id, newPost);
			}
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
	max-width: 350px;
}
</style>
