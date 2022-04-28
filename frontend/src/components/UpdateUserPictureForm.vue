<template>
	<form @submit.prevent="onFormSubmit">
		<ImageUpdateBox
			:image="user.picture"
			updatedGroup="user"
			@update-image-input="updateImageInput"
		/>
		<SubmitFormBtn>Save</SubmitFormBtn>
	</form>
</template>

<script>
import ImageUpdateBox from "./ImageUpdateBox.vue";
import SubmitFormBtn from "./SubmitFormBtn.vue";

export default {
	props: ["user"],

	data() {
		return {
			image: undefined,
		};
	},

	components: {
		ImageUpdateBox,
		SubmitFormBtn,
	},

	methods: {
		updateImageInput(newImage) {
			this.image = newImage;
		},

		onFormSubmit() {
			this.$emit("update-user-picture", this.image);
		},
	},
};
</script>
