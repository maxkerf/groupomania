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
		<div>
			<label
				class="image-label"
				for="image"
				title="Add an image"
				v-show="!showImagePreview"
			>
				<i class="fa-solid fa-image"></i>
			</label>
			<input
				class="image-input"
				type="file"
				id="image"
				accept=".jpg,.jpeg,.png,.gif"
				ref="imageInput"
				@change="onImageInputChange"
			/>
		</div>
		<div class="image-preview-box" v-show="showImagePreview">
			<img :src="imagePreviewSource" alt="Image preview" />
			<button
				class="remove-image-preview-btn"
				type="button"
				title="Remove the image"
				@click="onRemoveImagePreviewBtnClick"
			>
				<i class="fa-solid fa-xmark"></i>
			</button>
		</div>
		<SubmitFormBtn>Save</SubmitFormBtn>
	</form>
</template>

<script>
import { mapState } from "vuex";
import SubmitFormBtn from "./SubmitFormBtn.vue";

async function createFileFromUrl(url, filename) {
	const res = await fetch(url);
	const data = await res.blob();
	const file = new File([data], filename, {
		type: data.type,
	});

	return file;
}

export default {
	props: ["post"],
	data() {
		return {
			text: "",
			image: undefined,
			imagePreviewSource: "",
			showImagePreview: false,
		};
	},
	components: {
		SubmitFormBtn,
	},
	computed: {
		...mapState(["apiRoot"]),
	},
	async created() {
		if (this.post.text) this.text = this.post.text;
		if (this.post.image) {
			const url = `${this.apiRoot}/images/post/${this.post.image}`;
			this.image = await createFileFromUrl(url, this.post.image);
			this.imagePreviewSource = url;
			this.showImagePreview = true;
		}
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

		onImageInputChange(e) {
			const file = e.srcElement.files[0];

			if (!file) {
				this.image = undefined;
				this.imagePreviewSource = "";
				this.showImagePreview = false;
				return;
			}

			this.image = file;
			this.imagePreviewSource = URL.createObjectURL(file);
			this.showImagePreview = true;
		},

		onRemoveImagePreviewBtnClick() {
			this.$refs.imageInput.value = "";
			this.image = undefined;
			this.imagePreviewSource = "";
			this.showImagePreview = false;
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
	& > div:nth-of-type(2) {
		margin-top: 0.75rem;
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 0.5rem;
	}
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

.image-label {
	font-size: 1.375rem;
	cursor: pointer;
	display: grid;
	place-items: center;
	width: 1.75em;
	height: 1.75em;
	border-radius: 50%;
	position: relative;
	z-index: 0;

	&::after {
		content: "";
		position: absolute;
		width: 100%;
		height: 100%;
		border-radius: 50%;
		background-color: lighten(#242526, 10%);
		z-index: -1;

		opacity: 0.5;
		transition: opacity 200ms;
	}

	&:hover::after {
		opacity: 1;
	}
}

.image-input {
	position: absolute;
	top: 0;
	z-index: -1;
	opacity: 0;
}

.image-preview-box {
	position: relative;

	& img {
		max-width: 100%;
		vertical-align: bottom;
		border-radius: 0.5em;
	}
}

.remove-image-preview-btn {
	border: unset;
	background-color: unset;
	padding: unset;
	font-size: unset;
	display: grid;
	place-items: center;
	width: 1.25em;
	height: 1.25em;
	position: absolute;
	right: 0.25em;
	top: 0.25em;
	cursor: pointer;
	z-index: 0;

	&::after {
		content: "";
		position: absolute;
		width: 100%;
		height: 100%;
		border-radius: 50%;
		background-color: #bbb;
		z-index: -1;

		opacity: 0.5;
		transition: opacity 200ms;
	}

	&:hover::after {
		opacity: 1;
	}
}
</style>
