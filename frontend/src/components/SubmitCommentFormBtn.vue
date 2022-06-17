<template>
	<button class="submit-btn" type="submit" title="Send a comment">
		<i class="fa-solid fa-paper-plane"></i>
	</button>
</template>

<style lang="scss">
.submit-btn {
	@include reset-btn;
	align-self: flex-start;
	cursor: pointer;
	display: grid;
	place-items: center;
	width: 2em;
	height: 2em;
	border-radius: 50%;
	background-color: $bg-color-2;
	position: relative;
	z-index: 0;

	& i {
		transform: translateX(-1px);
	}

	&:focus-visible {
		outline: 2px solid;
	}

	&::after {
		content: "";
		position: absolute;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
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
