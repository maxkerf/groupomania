<template>
	<form novalidate @submit.prevent="onFormSubmit">
		<BasicInput
			type="email"
			name="email"
			title="Email"
			placeholder="Email"
			:focus="true"
			v-model="email"
		/>
		<FormErrorMessageContainer :errorMessage="errors.email" />
		<BasicInput
			type="password"
			name="password"
			title="Password"
			placeholder="Password"
			v-model="password"
		/>
		<FormErrorMessageContainer :errorMessage="errors.password" />
		<FormErrorMessageContainer :errorMessage="errors.global" :isGlobal="true" />
		<SubmitFormBtn>Login</SubmitFormBtn>
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
	data() {
		return {
			email: "",
			password: "",
			errors: {
				email: "",
				password: "",
				global: "",
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
				const user = {
					email: this.email,
					password: this.password,
				};

				this.$emit("login", user);
			}
		},
	},
};
</script>

<style lang="scss" scoped>
form {
	margin-top: 0.5rem;
	display: flex;
	flex-direction: column;
	gap: 0.75rem;
}

button[type="submit"] {
	margin-top: 0.5rem;
}
</style>
