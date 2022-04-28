<template>
	<button class="submit-form-btn" type="submit"><slot></slot></button>
</template>

<style lang="scss" scoped>
.submit-form-btn {
	border: unset;
	color: unset;
	font-size: unset;
	font-family: unset;
	background-color: #515151;
	padding: 0.25rem 0.5rem 0.375rem 0.5rem;
	border-radius: 0.25rem;
	cursor: pointer;
	display: block;
	margin: 0 auto;
	font-weight: 500;
	position: relative;
	z-index: 0;

	&::after {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		border-radius: inherit;
		background-color: lighten(#242526, 10%);
		z-index: -1;

		opacity: 0;
		transition: opacity 200ms;
	}

	&:hover {
		color: #ffd7d7;

		&::after {
			opacity: 1;
		}
	}
}
</style>
