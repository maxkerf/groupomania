<template>
	<form novalidate @submit.prevent="onFormSubmit" ref="form">
		<TextareaInputBox :text="text" :focus="true" @update-text="updateText" />
		<p class="error-msg" v-show="errors.text">{{ errors.text }}</p>
		<ImageInputBox :image="image" @update-image="updateImage" />
		<p class="error-msg" v-show="errors.image">{{ errors.image }}</p>
		<p class="error-msg error-msg-global" v-if="errors.global">
			{{ errors.global }}
		</p>
		<SubmitFormBtn>Post</SubmitFormBtn>
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

	methods: {
		updateText(newText) {
			this.text = newText;
		},

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
}

.error-msg {
	color: #ff4444;
	margin: -0.25rem 0.5rem 0 0.5rem;
	text-align: center;

	&-global {
		margin: 0.25rem 0 0 0;
	}
}
</style>
