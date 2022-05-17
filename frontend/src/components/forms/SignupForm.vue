<template>
	<form @submit.prevent="onFormSubmit">
		<BasicInput
			type="email"
			placeholder="Email"
			maxlength="50"
			:focus="true"
			v-model="email"
		/>
		<BasicInput
			type="password"
			placeholder="Password"
			maxlength="30"
			v-model="password"
		/>
		<BasicInput
			type="text"
			placeholder="Username"
			maxlength="30"
			v-model="username"
		/>
		<SubmitFormBtn>Signup</SubmitFormBtn>
	</form>
</template>

<script>
import BasicInput from "../BasicInput.vue";
import SubmitFormBtn from "../SubmitFormBtn.vue";

export default {
	data() {
		return {
			email: "",
			password: "",
			username: "",
		};
	},

	components: {
		BasicInput,
		SubmitFormBtn,
	},

	methods: {
		onFormSubmit() {
			const user = {
				email: this.email,
				password: this.password,
				username: this.username,
			};

			this.$emit("signup", user);
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
