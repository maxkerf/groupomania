<template>
	<form @submit.prevent="onFormSubmit">
		<BasicInput
			type="email"
			placeholder="Email"
			:focus="true"
			v-model="email"
		/>
		<BasicInput type="password" placeholder="Password" v-model="password" />
		<p class="error-message" v-if="errorMessage">{{ errorMessage }}</p>
		<SubmitFormBtn>Login</SubmitFormBtn>
	</form>
</template>

<script>
import BasicInput from "./BasicInput.vue";
import SubmitFormBtn from "./SubmitFormBtn.vue";

export default {
	data() {
		return {
			email: "",
			password: "",
		};
	},

	props: ["errorMessage"],

	components: {
		BasicInput,
		SubmitFormBtn,
	},

	methods: {
		updateEmail(newEmail) {
			this.email = newEmail;
		},

		onFormSubmit() {
			const user = {
				email: this.email,
				password: this.password,
			};

			this.$emit("login", user);
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

.error-message {
	margin: 0;
	text-align: center;
	color: #ff4444;
}

button[type="submit"] {
	margin-top: 0.5rem;
}
</style>
