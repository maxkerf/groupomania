<template>
	<div class="text-input-box">
		<input
			class="text-input"
			type="text"
			name="text"
			placeholder="Add a comment"
			:maxlength="maxlength"
			required
			ref="textInput"
			:value="text"
			@input="onTextInput"
			@blur="$emit('blur')"
		/>
		<span class="text-counter">{{ text.length }}/{{ maxlength }}</span>
	</div>
</template>

<script>
export default {
	props: {
		text: {
			type: String,
			required: true,
		},
		oldText: String,
	},

	data() {
		return {
			maxlength: 255,
		};
	},

	mounted() {
		if (this.oldText) {
			this.emitText(this.oldText);
		}
	},

	methods: {
		emitText(newtext) {
			this.$emit("update-text", newtext);
		},

		onTextInput(e) {
			this.emitText(e.srcElement.value);
		},
	},
};
</script>

<style lang="scss" scoped>
.text-input-box {
	background-color: #515151;
	border-radius: 0.5rem;
	padding: 0.25rem 0.5rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 0.5rem;
}

.text-input {
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
