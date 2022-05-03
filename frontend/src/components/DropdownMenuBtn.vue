<template>
	<button class="dropdown-menu-btn">
		<i :class="icon"></i><span>{{ name }}</span>
	</button>
</template>

<script>
export default {
	props: {
		name: { type: String, required: true, default: "Button" },
		icon: { type: String, required: true, default: "fa-solid fa-icons" },
	},
};
</script>

<style lang="scss" scoped>
.dropdown-menu-btn {
	border: unset;
	font-size: unset;
	font-family: unset;
	background-color: unset;
	padding: 0.25em 1em 0.25em 0.5em;
	cursor: pointer;
	color: #e4e6eb;
	border-radius: 0.1em;
	display: grid;
	grid-template-columns: 1em 1fr;
	align-items: center;
	gap: 0.5em;
	position: relative;

	& span {
		justify-self: start;
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
