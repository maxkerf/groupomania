<template>
	<div class="textarea-input-box">
		<textarea
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
</template>

<script>
export default {
	props: {
		text: {
			type: String,
			required: true,
		},
		oldText: String,
	},

	mounted() {
		if (this.oldText) {
			this.$refs.textInput.value = this.oldText;
			this.emitText(this.oldText);
			this.resizeTextInput();
		}

		this.focusTextInput();
	},

	methods: {
		emitText(newtext) {
			this.$emit("update-text", newtext);
		},

		resizeTextInput() {
			const textInput = this.$refs.textInput;
			textInput.style.height = "auto";
			textInput.style.height = `${textInput.scrollHeight}px`;
		},

		focusTextInput() {
			this.$refs.textInput.focus();
		},

		onTextInput(e) {
			this.emitText(e.srcElement.value);
			this.resizeTextInput();
		},
	},
};
</script>

<style lang="scss" scoped>
.textarea-input-box {
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
