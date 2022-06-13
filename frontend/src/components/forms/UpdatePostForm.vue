<template>
	<form novalidate @submit.prevent="onFormSubmit">
		<TextareaInputBox v-model="text" :focus="true" />
		<p class="error-msg" v-show="errors.text">{{ errors.text }}</p>
		<ImageInputBox
			:image="image"
			:oldImage="post.image"
			updatedImageGroup="post"
			@update-image="updateImage"
		/>
		<p class="error-msg" v-show="errors.image">{{ errors.image }}</p>
		<p class="error-msg error-msg-global" v-if="errors.global">
			{{ errors.global }}
		</p>
		<SubmitFormBtn>Save</SubmitFormBtn>
	</form>
</template>

<script>
import TextareaInputBox from "../TextareaInputBox.vue";
import ImageInputBox from "../ImageInputBox.vue";
import SubmitFormBtn from "../SubmitFormBtn.vue";
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
}

.error-msg {
	color: $txt-color-error;
	margin: -0.25rem 0.5rem 0 0.5rem;
	text-align: center;

	&-global {
		margin: 0.25rem 0 0 0;
	}
}
</style>
