<template>
	<form @submit.prevent="updateComment">
		<div>
			<input
				type="text"
				name="text"
				v-model="text"
				placeholder="Add a comment"
				maxlength="255"
				ref="input"
				@blur="$emit('blur')"
			/>
			<span class="text-counter">{{ text.length }}/255</span>
		</div>
	</form>
</template>

<script>
export default {
	props: ["comment"],
	data() {
		return {
			text: this.comment.text,
		};
	},
	mounted() {
		this.$refs.input.focus();
	},
	methods: {
		updateComment() {
			const newComment = {
				text: this.text,
			};

			this.$emit("update-comment", newComment);
		},
	},
};
</script>

<style lang="scss" scoped>
form {
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
