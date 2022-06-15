<template>
	<div class="textarea-input-box">
		<textarea
			class="text-input"
			name="text"
			rows="1"
			cols="50"
			:required="required"
			:maxlength="maxlength"
			:title="title"
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
		},

		required: {
			type: Boolean,
			default: false,
		},
		maxlength: {
			type: Number,
			default: 255,
		},
		title: {
			type: String,
		},
		placeholder: {
			type: String,
			default: "Text",
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
		this.resizeTextarea();
	},

	methods: {
		async resizeTextarea() {
			await this.$nextTick(); // when the value is reset by the parent, wait to have the new one (not the old)
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
	box-sizing: border-box;
	min-height: 2em;
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
	margin-top: 1px;
	width: 100%;

	&::placeholder {
		color: $txt-color-2;
	}
}

.text-counter {
	font-size: 0.75em;
	margin-top: calc(5em / 16);
}
</style>
