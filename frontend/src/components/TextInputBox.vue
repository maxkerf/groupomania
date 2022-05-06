<template>
	<div class="text-input-box">
		<input
			class="text-input"
			type="text"
			name="text"
			:placeholder="placeholder"
			:maxlength="maxlength"
			required
			ref="textInput"
			:value="text"
			@input="onTextInput"
		/>
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
	},

	mounted() {
		if (this.oldText) this.emitText(this.oldText);
		if (this.focus) this.focusTextInput();
	},

	methods: {
		emitText(newtext) {
			this.$emit("update-text", newtext);
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
.text-input-box {
	background-color: #515151;
	border-radius: 0.5rem;
	padding: 0.25rem 0.5rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 0.5rem;
}

.text-input {
	flex: 1;
	border: unset;
	background-color: unset;
	padding: unset;
	font-size: unset;
	color: unset;
	font-family: unset;
	outline: unset;

	&::placeholder {
		color: #b0b3b8;
	}
}

.text-counter {
	font-size: 0.75rem;
}
</style>
