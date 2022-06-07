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
@mixin reset-input {
	border: unset;
	background-color: unset;
	padding: unset;
	font-size: unset;
	color: unset;
	font-family: unset;
	outline: unset;
}

input {
	@include reset-input();
	background-color: #515151;
	border-radius: 0.5rem;
	padding: 0.25rem 0.5rem;

	&::placeholder {
		color: #b0b3b8;
	}

	&:focus {
		outline: 2px solid #e4e6eb;
	}
}
</style>
