<template>
	<div
		:class="`dropdown-box${
			attachedElement ? ` dropdown-box-${attachedElement}` : ''
		}`"
	>
		<button @click="toggleDropdownMenu" class="dropdown-btn" ref="dropdownBtn">
			<i class="fa-solid fa-ellipsis"></i>
		</button>
		<div v-show="showDropdownMenu" class="dropdown-menu">
			<slot></slot>
		</div>
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
		},

		closeDropdownMenu() {
			this.showDropdownMenu = false;
			window.removeEventListener("click", this.handleWindowClick);
		},

		toggleDropdownMenu() {
			this.showDropdownMenu
				? this.closeDropdownMenu()
				: this.openDropdownMenu();
		},

		isEventInsideElement(e, el) {
			return e.path.find(i => i === el) ? true : false;
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
	position: relative;

	&-post {
		& .dropdown-btn {
			&:hover {
				background-color: lighten(#242526, 10%);
			}
		}
	}

	&-comment {
		& .dropdown-btn {
			font-size: 0.75rem;
			&:hover {
				background-color: lighten(#515151, 10%);
			}
		}
	}
}

.dropdown-btn {
	border: unset;
	background-color: unset;
	padding: unset;
	color: #e4e6eb;
	cursor: pointer;
	font-size: unset;
	width: 2em;
	height: 2em;
	border-radius: 50%;
	display: grid;
	place-items: center;
}

.dropdown-menu {
	position: absolute;
	top: 100%;
	right: 0;
	background-color: #242526;
	display: flex;
	flex-direction: column;
	gap: 2px;
	padding: 2px;
	border: 0.0625em solid #515151;
	border-radius: 0.2em;
	margin-top: 0.2em;
	box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.1);
	z-index: 1;
}
</style>
