<template>
	<input
		required
		ref="input"
		:value="modelValue"
		@input="$emit('update:modelValue', $event.target.value)"
	/>
</template>

<script>
export default {
	name: "BasicInput",

	props: {
		modelValue: {
			type: String,
		},
		focus: {
			type: Boolean,
			default: false,
		},
	},

	emits: ["update:modelValue"],

	mounted() {
		if (this.focus) this.$refs.input.focus();
	},
};
</script>

<style lang="scss" scoped>
input {
	@include reset-input();
	background-color: $bg-color-2;
	border-radius: 0.5rem;
	padding: 0.25rem 0.5rem;
	box-sizing: border-box;
	width: 100%;

	&::placeholder {
		color: $txt-color-2;
	}

	&:focus-visible {
		outline: 2px solid $txt-color-1;
	}
}
</style>
