<template>
	<button class="submit-btn" type="submit" title="Send comment">
		<i class="fa-solid fa-paper-plane"></i>
	</button>
</template>

<style lang="scss">
@mixin reset-btn {
	border: unset;
	background-color: unset;
	font-size: unset;
	font-family: unset;
	color: unset;
	padding: unset;
}

.submit-btn {
	@include reset-btn;
	align-self: flex-start;
	cursor: pointer;
	display: grid;
	place-items: center;
	width: 2em;
	height: 2em;
	border-radius: 50%;
	background-color: #515151;
	position: relative;
	z-index: 0;

	& i {
		transform: translateX(-1px);
	}

	&::after {
		content: "";
		position: absolute;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		border-radius: inherit;
		background-color: lighten(#242526, 10%);
		z-index: -1;
		opacity: 0;
		transition: opacity 100ms;
	}

	&:hover {
		color: #ffd7d7;

		&::after {
			opacity: 1;
		}
	}
}
</style>
