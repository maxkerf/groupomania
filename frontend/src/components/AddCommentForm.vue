<template>
	<form @submit.prevent="addComment">
		<div>
			<input
				type="text"
				name="text"
				v-model="text"
				placeholder="Add a comment"
				maxlength="255"
			/>
			<span class="text-counter">{{ text.length }}/255</span>
		</div>
	</form>
</template>

<script>
export default {
	data() {
		return {
			text: "",
		};
	},
	methods: {
		addComment(e) {
			const comment = {
				text: this.text,
			};

			this.$emit("add-comment", comment);

			this.text = "";
			e.srcElement[0].blur(); // input element
		},
	},
};
</script>

<style lang="scss" scoped>
form {
	margin-top: 0.75rem;
	padding: 0 0.75rem 0.75rem 0.75rem;

	& div {
		background-color: #515151;
		border-radius: 0.5rem;
		padding: 0.25rem 0.5rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 0.5rem;
	}
}

input {
	flex: 1;
	border: unset;
	background-color: unset;
	padding: unset;
	font-size: unset;
	color: unset;
	font-family: unset;
	outline: unset;

	&::placeholder {
		color: #b0b3b8;
	}
}

.text-counter {
	font-size: 0.75rem;
}
</style>
