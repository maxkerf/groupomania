<template>
	<form @submit.prevent="onFormSubmit">
		<ImageInputBox
			:image="image"
			:oldImage="user.picture"
			updatedImageGroup="user"
			@update-image="updateImage"
		/>
		<FormErrorMessageContainer :errorMessage="errors.image" />
		<SubmitFormBtn>Save</SubmitFormBtn>
	</form>
</template>

<script>
import ImageInputBox from "../ImageInputBox.vue";
import SubmitFormBtn from "../SubmitFormBtn.vue";
import FormErrorMessageContainer from "../FormErrorMessageContainer.vue";

export default {
	name: "UpdateUserPictureForm",

	props: ["user"],

	data() {
		return {
			image: null,
			errors: {
				image: "",
			},
		};
	},

	components: {
		ImageInputBox,
		SubmitFormBtn,
		FormErrorMessageContainer,
	},

	methods: {
		updateImage(newImage) {
			this.image = newImage;
		},

		onFormSubmit() {
			this.$emit("update-user-picture", this.image);
		},
	},
};
</script>

<style lang="scss" scoped>
form {
	display: flex;
	flex-direction: column;
	gap: 1rem;
	max-width: 350px;
}
</style>
