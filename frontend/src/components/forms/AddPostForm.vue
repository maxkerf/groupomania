<template>
	<form novalidate @submit.prevent="onFormSubmit" ref="form">
		<TextareaInputBox v-model="text" :focus="true" />
		<FormErrorMessageContainer :errorMessage="errors.text" />
		<ImageInputBox :image="image" @update-image="updateImage" />
		<FormErrorMessageContainer :errorMessage="errors.image" />
		<FormErrorMessageContainer :errorMessage="errors.global" :isGlobal="true" />
		<SubmitFormBtn>Post</SubmitFormBtn>
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
	name: "AddPostForm",

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
				const post = {
					text: this.text,
					image: this.image,
				};

				this.$emit("add-post", post);
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
