<template>
	<form @submit.prevent="onFormSubmit">
		<ImageInputBox
			:image="image"
			:oldImage="user.picture"
			updatedImageGroup="user"
			@update-image="updateImage"
		/>
		<p class="error-msg" v-show="errors.image">{{ errors.image }}</p>
		<SubmitFormBtn>Save</SubmitFormBtn>
	</form>
</template>

<script>
import ImageInputBox from "../ImageInputBox.vue";
import SubmitFormBtn from "../SubmitFormBtn.vue";

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

.error-msg {
	color: $txt-color-error;
	margin: -0.25rem 0.5rem 0 0.5rem;
	text-align: center;
}
</style>
