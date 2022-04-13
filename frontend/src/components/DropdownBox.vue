<template>
	<div class="dropdown-box">
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
	mounted() {
		if (this.attachedElement)
			this.$refs.dropdownBtn.classList.add(
				`dropdown-btn-${this.attachedElement}`
			);
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
	margin-left: 1rem;
	position: relative;
	display: flex;
	justify-self: end;
}

.dropdown-btn {
	border: unset;
	background: unset;
	cursor: pointer;
	border-radius: 1rem;

	&-post {
		padding: 0.125rem 0.375rem;

		&:hover {
			background-color: #ddd;
		}
	}

	&-comment {
		padding: 0.125rem 0.25rem;

		&:hover {
			background-color: #fff;
		}
	}
}

.dropdown-menu {
	position: absolute;
	top: 25px;
}
</style>
