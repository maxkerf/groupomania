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

	& span {
		justify-self: start;
	}

	&:hover {
		background-color: lighten(#242526, 10%);
		color: #ffd7d7;
	}
}
</style>
