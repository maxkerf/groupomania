<template>
	<form @submit.prevent="updatePost">
		<div class="text-input-box">
			<textarea
				v-model="text"
				class="text-input"
				name="text"
				id="text"
				maxlength="255"
				rows="1"
				placeholder="Write something here..."
				ref="textInput"
				@input="onTextInput"
			></textarea>
			<span class="text-counter">{{ text.length }}/255</span>
		</div>
		<ImageUpdateBox
			:image="post.image"
			updatedGroup="post"
			@update-image-input="updateImageInput"
		/>
		<SubmitFormBtn>Save</SubmitFormBtn>
	</form>
</template>

<script>
import ImageUpdateBox from "./ImageUpdateBox.vue";
import SubmitFormBtn from "./SubmitFormBtn.vue";

export default {
	props: ["post"],

	data() {
		return {
			text: "",
			image: undefined,
		};
	},

	components: {
		ImageUpdateBox,
		SubmitFormBtn,
	},

	async created() {
		if (this.post.text) this.text = this.post.text;
	},

	mounted() {
		this.resizeTextInput();
		this.$refs.textInput.focus();
	},

	methods: {
		resizeTextInput() {
			const textInput = this.$refs.textInput;
			textInput.style.height = "auto";
			textInput.style.height = `${textInput.scrollHeight}px`;
		},

		onTextInput() {
			this.resizeTextInput();
		},

		updateImageInput(newImage) {
			this.image = newImage;
		},

		updatePost() {
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
}

.text-input-box {
	background-color: #515151;
	padding: 0.5rem;
	border-radius: 0.5rem;
	display: flex;
	justify-content: space-between;
	gap: 1rem;
}

.text-input {
	flex: 1;
	resize: unset;
	border: unset;
	padding: unset;
	font-size: unset;
	font-family: unset;
	color: unset;
	background-color: unset;
	outline: unset;
	overflow: hidden;

	&::placeholder {
		color: #b0b3b8;
	}
}

.text-counter {
	font-size: 0.75em;
}
</style>
