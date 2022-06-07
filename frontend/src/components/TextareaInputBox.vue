<template>
	<div class="textarea-input-box">
		<textarea
			class="text-input"
			name="text"
			:required="required"
			:maxlength="maxlength"
			rows="1"
			:placeholder="placeholder"
			ref="textInput"
			@input="onTextInput"
		></textarea>
		<span class="text-counter">{{ text.length }}/{{ maxlength }}</span>
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
		focus: {
			type: Boolean,
			default: false,
		},
		maxlength: {
			type: Number,
			default: 255,
		},
		placeholder: {
			type: String,
			default: "Write something here...",
		},
		required: {
			type: Boolean,
			default: false,
		},
	},

	watch: {
		text(newText) {
			this.$refs.textInput.value = newText;
			this.resizeTextInput();
		},
	},

	mounted() {
		if (this.oldText) this.emitText(this.oldText);
		if (this.focus) this.focusTextInput();
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
		},
	},
};
</script>

<style lang="scss" scoped>
.textarea-input-box {
	background-color: #515151;
	padding: 0.25rem 0.5rem;
	border-radius: 0.5rem;
	display: flex;
	justify-content: space-between;
	gap: 1rem;
	min-height: 2em;
	box-sizing: border-box;
	width: 350px;
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
	margin-top: 1px;

	&::placeholder {
		color: #b0b3b8;
	}
}

.text-counter {
	font-size: 0.75em;
	margin-top: calc(5em / 16);
}
</style>
