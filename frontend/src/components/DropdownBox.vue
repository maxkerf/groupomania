<template>
	<div
		:class="`dropdown-box${
			attachedElement ? ` dropdown-box-${attachedElement}` : ''
		}`"
	>
		<button
			@click="toggleDropdownMenu"
			class="dropdown-btn"
			ref="dropdownBtn"
			aria-label="Dropdown Menu"
		>
			<i class="fa-solid fa-ellipsis"></i>
		</button>
		<Transition name="dropdown-menu">
			<div v-show="showDropdownMenu" class="dropdown-menu">
				<slot></slot>
			</div>
		</Transition>
	</div>
</template>

<script>
export default {
	props: ["attachedElement"],
	data() {
		return {
			showDropdownMenu: false,
		};
	},
	methods: {
		openDropdownMenu() {
			this.showDropdownMenu = true;
			window.addEventListener("click", this.handleWindowClick);
			window.addEventListener("wheel", this.handleWindowClick);
		},

		closeDropdownMenu() {
			this.showDropdownMenu = false;
			window.removeEventListener("click", this.handleWindowClick);
			window.removeEventListener("wheel", this.handleWindowClick);
		},

		toggleDropdownMenu() {
			this.showDropdownMenu
				? this.closeDropdownMenu()
				: this.openDropdownMenu();
		},

		isEventInsideElement(e, el) {
			return e.composedPath().find(i => i === el) ? true : false;
		},

		handleWindowClick(e) {
			if (!this.isEventInsideElement(e, this.$refs.dropdownBtn)) {
				this.toggleDropdownMenu();
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.dropdown-box {
	&-post {
		& .dropdown-btn {
			&::after {
				background-color: lighten($bg-color-1, 10%);
			}
		}

		& .dropdown-menu {
			transform: translateX(calc(-100% + 32px)); // dp-btn size
		}
	}

	&-comment {
		& .dropdown-btn {
			&::after {
				background-color: lighten($bg-color-2, 10%);
			}

			font-size: 0.75rem;
		}

		& .dropdown-menu {
			transform: translateX(calc(-100% + 24px)); // dp-btn size
		}
	}
}

.dropdown-btn {
	border: unset;
	background-color: unset;
	padding: unset;
	color: $txt-color-1;
	cursor: pointer;
	font-size: unset;
	width: 2em;
	height: 2em;
	border-radius: 50%;
	display: grid;
	place-items: center;
	position: relative;
	z-index: 0;

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
		&:hover::after {
			opacity: 1;
		}
	}
}

.dropdown-menu {
	position: absolute;
	background-color: $bg-color-1;
	display: flex;
	flex-direction: column;
	gap: 2px;
	padding: 2px;
	border: 0.0625em solid $bg-color-2;
	border-radius: 0.2em;
	margin-top: 0.2em;
	box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.1);
	z-index: 1;

	&-enter-active,
	&-leave-active {
		transition: opacity 0.2s;
	}

	&-enter-from,
	&-leave-to {
		opacity: 0;
	}
}
</style>
