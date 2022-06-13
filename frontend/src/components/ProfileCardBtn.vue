<template>
	<button class="profile-card-btn" :title="title">
		<i :class="icon"></i>
	</button>
</template>

<script>
export default {
	props: {
		icon: String,
		title: String,
	},
};
</script>

<style lang="scss" scoped>
.profile-card-btn {
	@include reset-btn();
	cursor: pointer;
	background-color: $bg-color-1;
	width: 2em;
	height: 2em;
	display: grid;
	place-items: center;
	border: calc(3em / 16) solid lighten($bg-color-1, 10%);
	border-radius: 0.375em;
	font-size: 1.25rem;
	background-color: $bg-color-2;
	position: relative;
	z-index: 0;

	@media (any-hover: hover) {
		&:hover {
			color: $contrast-color;

			&::after {
				opacity: 1;
			}
		}
	}

	&::after {
		content: "";
		position: absolute;
		width: 115%;
		height: 115%;
		background-color: lighten($bg-color-1, 10%);
		z-index: -1;
		border-radius: inherit;
		opacity: 0;
		transition: opacity 100ms;
	}
}
</style>
