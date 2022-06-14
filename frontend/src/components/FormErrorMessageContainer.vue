<template>
	<p
		:class="`error-msg${isGlobal ? ' error-msg-global' : ''}`"
		v-show="errorMessage"
	>
		{{ errorMessage }}
	</p>
</template>

<script>
export default {
	name: "FormErrorMessageContainer",

	props: {
		errorMessage: {
			type: String,
		},
		isGlobal: {
			type: Boolean,
			default: false,
		},
	},
};
</script>

<style lang="scss" scoped>
.error-msg {
	margin: unset;
	color: $txt-color-error;
	margin-top: -0.25rem;
	text-align: center;

	&-global {
		margin-top: 0.25rem;
	}
}
</style>
