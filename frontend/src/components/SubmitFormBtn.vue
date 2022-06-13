<template>
	<button type="submit"><slot></slot></button>
</template>

<style lang="scss" scoped>
button {
	border: unset;
	color: unset;
	font-size: unset;
	font-family: unset;
	background-color: $bg-color-2;
	padding: 0.25rem 0.5rem 0.375rem 0.5rem;
	border-radius: 0.25rem;
	cursor: pointer;
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
		background-color: lighten($bg-color-1, 10%);
		z-index: -1;

		opacity: 0;
		transition: opacity 100ms;
	}

	@media (any-hover: hover) {
		&:hover {
			color: $contrast-color;

			&::after {
				opacity: 1;
			}
		}
	}
}
</style>
