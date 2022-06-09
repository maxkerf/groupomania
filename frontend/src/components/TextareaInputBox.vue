<template>
	<div class="textarea-input-box">
		<textarea
			class="text-input"
			name="text"
			rows="1"
			:required="required"
			:maxlength="maxlength"
			:placeholder="placeholder"
			ref="textarea"
			:value="modelValue"
			@input="$emit('update:modelValue', $event.target.value)"
		></textarea>
		<span class="text-counter">{{ modelValue.length }}/{{ maxlength }}</span>
	</div>
</template>

<script>
export default {
	name: "TextareaInputBox",

	props: {
		modelValue: {
			type: String,
			default: "",
		},

		required: {
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

		focus: {
			type: Boolean,
			default: false,
		},
	},

	emits: ["update:modelValue"],

	watch: {
		modelValue() {
			this.resizeTextarea();
		},
	},

	mounted() {
		if (this.focus) this.$refs.textarea.focus();
	},

	methods: {
		resizeTextarea() {
			const textarea = this.$refs.textarea;
			textarea.style.height = "auto";
			textarea.style.height = `${textarea.scrollHeight}px`;
		},
	},
};
</script>

<style lang="scss" scoped>
.textarea-input-box {
	background-color: $bg-color-2;
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
		color: $txt-color-2;
	}
}

.text-counter {
	font-size: 0.75em;
	margin-top: calc(5em / 16);
}
</style>
