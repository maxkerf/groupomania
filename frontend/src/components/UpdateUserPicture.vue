<template>
	<div>
		<button
			v-if="login.userId == this.$route.params.id"
			@click="$emit('toggle-updating-picture')"
		>
			<i v-show="updatingPicture" class="fa-solid fa-caret-up"></i>
			<i v-show="!updatingPicture" class="fa-solid fa-caret-down"></i>
			<span> Update picture</span>
		</button>
		<UpdateUserPictureForm
			:updatingPicture="updatingPicture"
			@update-user-picture="
				newPicture => $emit('update-user-picture', newPicture)
			"
		/>
	</div>
</template>

<script>
import { mapState } from "vuex";
import UpdateUserPictureForm from "../components/UpdateUserPictureForm.vue";

export default {
	props: ["updatingPicture"],
	components: {
		UpdateUserPictureForm,
	},
	computed: {
		...mapState(["login"]),
	},
};
</script>
