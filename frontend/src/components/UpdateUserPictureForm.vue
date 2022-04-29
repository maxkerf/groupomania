<template>
	<form @submit.prevent="onFormSubmit">
		<ImageInputBox
			:image="image"
			:oldImage="user.picture"
			updatedImageGroup="user"
			@update-image="updateImage"
		/>
		<SubmitFormBtn>Save</SubmitFormBtn>
	</form>
</template>

<script>
import ImageInputBox from "./ImageInputBox.vue";
import SubmitFormBtn from "./SubmitFormBtn.vue";

export default {
	props: ["user"],

	data() {
		return {
			image: null,
		};
	},

	components: {
		ImageInputBox,
		SubmitFormBtn,
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
}
</style>
