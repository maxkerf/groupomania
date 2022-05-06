<template>
	<form @submit.prevent="onFormSubmit">
		<TextInputBox
			:text="username"
			:oldText="user.username"
			:focus="true"
			:maxlength="30"
			placeholder="Username"
			@update-text="updateUsername"
		/>
		<SubmitFormBtn>Save</SubmitFormBtn>
	</form>
</template>

<script>
import TextInputBox from "./TextInputBox.vue";
import SubmitFormBtn from "./SubmitFormBtn.vue";

export default {
	props: ["user"],

	data() {
		return {
			username: this.user.username,
		};
	},

	components: {
		TextInputBox,
		SubmitFormBtn,
	},

	methods: {
		updateUsername(newUsername) {
			this.username = newUsername;
		},

		onFormSubmit() {
			const newUser = { username: this.username };
			this.$emit("update-user", newUser);
		},
	},
};
</script>

<style lang="scss" scoped>
form {
	display: flex;
	flex-direction: column;
	gap: 1rem;
}
</style>
