<template>
	<div>
		<div class="image-input-box">
			<input
				class="image-input"
				type="file"
				name="image"
				id="image"
				accept=".jpg,.jpeg,.png"
				ref="imageInput"
				@change="onImageInputChange"
			/>
			<label
				class="image-label"
				for="image"
				title="Add an image"
				v-show="!image"
			>
				<i class="fa-solid fa-image"></i>
			</label>
		</div>
		<div class="image-preview-box" v-show="image">
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
	props: {
		image: {
			type: [File, null],
			required: true,
		},
		oldImage: {
			type: String,
		},
		updatedImageGroup: {
			type: String,
		},
	},

	computed: {
		...mapState(["apiRoot"]),

		imagePreviewSource() {
			return this.image ? URL.createObjectURL(this.image) : "";
		},
	},

	async created() {
		if (this.oldImage) {
			const url = `${this.apiRoot}/images/${this.updatedImageGroup}/${this.oldImage}`;
			this.emitImage(await createFileFromUrl(url, this.oldImage));
		}
	},

	methods: {
		emitImage(newImage) {
			this.$emit("update-image", newImage);
		},

		onImageInputChange(e) {
			const file = e.target.files[0];
			this.emitImage(file ? file : null);
		},

		onRemoveImageBtnClick() {
			this.$refs.imageInput.value = "";
			this.emitImage(null);
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
		background-color: lighten($bg-color-1, 10%);
		z-index: -1;

		opacity: 0.5;
		transition: opacity 100ms;
	}

	@media (any-hover: hover) {
		&:hover::after {
			opacity: 1;
		}
	}
}

.image-input {
	position: absolute;
	top: 0;
	z-index: -1;
	opacity: 0;

	&:focus-visible + .image-label {
		outline: 2px solid;
	}
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
		background-color: $txt-color-1;
		z-index: -1;

		opacity: 0.5;
		transition: opacity 100ms;
	}

	@media (any-hover: hover) {
		&:hover::after {
			opacity: 1;
		}
	}
}
</style>
