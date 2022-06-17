<template>
	<form novalidate @submit.prevent="onFormSubmit">
		<BasicInput
			type="text"
			name="username"
			title="Username"
			placeholder="Username"
			maxlength="15"
			:focus="true"
			v-model="username"
		/>
		<FormErrorMessageContainer :errorMessage="errors.username" />
		<SubmitFormBtn>Save</SubmitFormBtn>
	</form>
</template>

<script>
import BasicInput from "../BasicInput.vue";
import SubmitFormBtn from "../SubmitFormBtn.vue";
import FormErrorMessageContainer from "../FormErrorMessageContainer.vue";
import {
	checkFormInputs,
	focusFirstInvalidFormInput,
} from "../../formValidation.js";

export default {
	props: {
		user: {
			type: Object,
		},
	},

	data() {
		return {
			username: this.user.username,
			errors: {
				username: "",
			},
		};
	},

	components: {
		BasicInput,
		SubmitFormBtn,
		FormErrorMessageContainer,
	},

	methods: {
		resetErrors() {
			for (const key in this.errors) this.errors[key] = "";
		},

		onFormSubmit(e) {
			this.resetErrors();
			checkFormInputs(this);
			focusFirstInvalidFormInput(this);

			if (e.target.checkValidity()) {
				const newUser = { username: this.username };
				this.$emit("update-user", newUser);
			}
		},
	},
};
</script>

<style lang="scss" scoped>
form {
	display: flex;
	flex-direction: column;
	gap: 1rem;
	max-width: 350px;
}
</style>
