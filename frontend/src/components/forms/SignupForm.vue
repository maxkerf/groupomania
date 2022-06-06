<template>
	<form novalidate @submit.prevent="onFormSubmit">
		<BasicInput
			type="email"
			name="email"
			placeholder="Email"
			maxlength="50"
			:focus="true"
			v-model="email"
		/>
		<p class="error-msg" v-show="errors.email">{{ errors.email }}</p>
		<BasicInput
			type="password"
			name="password"
			placeholder="Password"
			maxlength="30"
			v-model="password"
		/>
		<p class="error-msg" v-show="errors.password">{{ errors.password }}</p>
		<BasicInput
			type="text"
			name="username"
			placeholder="Username"
			maxlength="30"
			v-model="username"
		/>
		<p class="error-msg" v-show="errors.username">{{ errors.username }}</p>
		<SubmitFormBtn>Signup</SubmitFormBtn>
	</form>
</template>

<script>
import BasicInput from "../BasicInput.vue";
import SubmitFormBtn from "../SubmitFormBtn.vue";
import {
	checkFormInputs,
	focusFirstInvalidFormInput,
} from "../../formValidation.js";

export default {
	data() {
		return {
			email: "",
			password: "",
			username: "",
			errors: {
				email: "",
				password: "",
				username: "",
			},
		};
	},

	components: {
		BasicInput,
		SubmitFormBtn,
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
					username: this.username,
				};

				this.$emit("signup", user);
			}
		},
	},
};
</script>

<style lang="scss" scoped>
form {
	width: 100%;
	margin-top: 0.5rem;
	display: flex;
	flex-direction: column;
	gap: 0.75rem;
}

button[type="submit"] {
	margin-top: 0.5rem;
}

.error-msg {
	margin: unset;
	color: #ff4444;
	margin: -0.25rem 0.5rem 0 0.5rem;
}
</style>
