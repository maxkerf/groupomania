<template>
	<form novalidate @submit.prevent="onFormSubmit">
		<BasicInput
			type="email"
			name="email"
			placeholder="Email"
			:focus="true"
			v-model="email"
		/>
		<p class="error-msg" v-show="errors.email">{{ errors.email }}</p>
		<BasicInput
			type="password"
			name="password"
			placeholder="Password"
			v-model="password"
		/>
		<p class="error-msg" v-show="errors.password">{{ errors.password }}</p>
		<p class="error-msg error-msg-global" v-if="errors.global">
			{{ errors.global }}
		</p>
		<SubmitFormBtn>Login</SubmitFormBtn>
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
	color: #ff4444;
	margin: -0.25rem 0.5rem 0 0.5rem;

	&-global {
		margin: 0.25rem 0 0 0;
		text-align: center;
	}
}
</style>
