<template>
	<div>
		<button
			v-if="login.userId == this.$route.params.id"
			@click="$emit('toggle-updating')"
		>
			<i v-show="updating" class="fa-solid fa-caret-up"></i>
			<i v-show="!updating" class="fa-solid fa-caret-down"></i>
			<span> Update infos</span>
		</button>
		<UpdateUserForm
			:updating="updating"
			:user="user"
			@update-user="newUser => $emit('update-user', newUser)"
		/>
	</div>
</template>

<script>
import { mapState } from "vuex";
import UpdateUserForm from "../components/UpdateUserForm.vue";

export default {
	props: ["updating", "user"],
	components: {
		UpdateUserForm,
	},
	computed: {
		...mapState(["login"]),
	},
};
</script>
