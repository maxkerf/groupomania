<template>
	<form novalidate @submit.prevent="onFormSubmit">
		<BasicInput
			type="text"
			name="username"
			placeholder="Username"
			maxlength="30"
			:focus="true"
			v-model="username"
		/>
		<p class="error-msg" v-show="errors.username">{{ errors.username }}</p>
		<SubmitFormBtn>Save</SubmitFormBtn>
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
}

.error-msg {
	margin: unset;
	color: #ff4444;
	margin: -0.25rem 0.5rem 0 0.5rem;
}
</style>
