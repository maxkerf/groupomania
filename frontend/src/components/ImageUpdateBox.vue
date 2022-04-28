<template>
	<div>
		<div class="image-input-box">
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
				accept=".jpg,.jpeg,.png"
				ref="imageInput"
				@change="onImageInputChange"
			/>
		</div>
		<div class="image-preview-box" v-show="showImagePreview">
			<img :src="imagePreviewSource" alt="Image preview" />
			<button
				class="remove-image-btn"
				type="button"
				title="Remove the image"
				@click="onRemoveImageBtnClick"
			>
				<i class="fa-solid fa-xmark"></i>
			</button>
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex";

async function createFileFromUrl(url, filename) {
	const res = await fetch(url);
	const data = await res.blob();
	const file = new File([data], filename, {
		type: data.type,
	});

	return file;
}

export default {
	props: ["image", "updatedGroup"],

	data() {
		return {
			imagePreviewSource: "",
			showImagePreview: false,
		};
	},

	computed: {
		...mapState(["apiRoot"]),
	},

	async created() {
		if (this.image) {
			const url = `${this.apiRoot}/images/${this.updatedGroup}/${this.image}`;
			this.updateImageInput(await createFileFromUrl(url, this.image));
			this.imagePreviewSource = url;
			this.showImagePreview = true;
		}
	},

	methods: {
		updateImageInput(newImage) {
			this.$emit("update-image-input", newImage);
		},

		onImageInputChange(e) {
			const file = e.srcElement.files[0];

			if (!file) {
				this.updateImageInput(undefined);
				this.imagePreviewSource = "";
				this.showImagePreview = false;
				return;
			}

			this.updateImageInput(file);
			this.imagePreviewSource = URL.createObjectURL(file);
			this.showImagePreview = true;
		},

		onRemoveImageBtnClick() {
			this.$refs.imageInput.value = "";
			this.updateImageInput(undefined);
			this.imagePreviewSource = "";
			this.showImagePreview = false;
		},
	},
};
</script>

<style lang="scss" scoped>
.image-input-box {
	position: relative;
}

.image-label {
	font-size: 1.375rem;
	cursor: pointer;
	display: grid;
	place-items: center;
	width: 1.75em;
	height: 1.75em;
	border-radius: 50%;
	margin: 0 auto;
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

.remove-image-btn {
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
