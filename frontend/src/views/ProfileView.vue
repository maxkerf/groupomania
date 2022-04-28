<template>
	<div class="profile-view">
		<img
			:src="`${apiRoot}/images/user/${user.picture}`"
			alt="profile picture"
		/>
		<button
			v-if="
				login.user.role === userRoles.admin ||
				login.user.id == this.$route.params.id
			"
			@click="toggleModal($refs.updatePictureModal)"
		>
			Update picture
		</button>
		<ModalBox
			:toggleModal="toggleModal"
			ref="updatePictureModal"
			title="Update user picture"
		>
			<UpdateUserPictureForm @update-user-picture="updateUserPicture" />
		</ModalBox>
		<hr />
		<span>Username: {{ user.username }}</span>
		<span>
			Creation date: {{ new Date(user.creationDate).toLocaleDateString() }}
		</span>
		<button
			v-if="
				login.user.role === userRoles.admin ||
				login.user.id == this.$route.params.id
			"
			@click="toggleModal($refs.updateInfosModal)"
		>
			Update infos
		</button>
		<ModalBox
			:toggleModal="toggleModal"
			ref="updateInfosModal"
			title="Update user infos"
		>
			<UpdateUserForm :user="user" @update-user="updateUser" />
		</ModalBox>
		<hr />
		<button v-if="login.user.id == this.$route.params.id" @click="logout">
			Logout
		</button>
		<button
			v-if="
				login.user.role === userRoles.admin ||
				login.user.id == this.$route.params.id
			"
			@click="deleteAccount"
		>
			Delete account
		</button>
	</div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import UpdateUserPictureForm from "../components/UpdateUserPictureForm.vue";
import UpdateUserForm from "../components/UpdateUserForm.vue";
import ModalBox from "../components/ModalBox.vue";
import handleError from "../handleError.js";

export default {
	data() {
		return {
			user: {
				picture: "user.svg",
			},
		};
	},
	components: {
		UpdateUserPictureForm,
		UpdateUserForm,
		ModalBox,
	},
	computed: {
		...mapState(["login", "apiRoot", "userRoles"]),
	},
	async created() {
		if (this.login.user.id === -1) return this.$router.push("/login");

		this.$watch(
			() => {
				return this.$route.params.id;
			},
			() => {
				if (this.$route.name === "profile") {
					console.log(this.$route.params.id);
					console.log(this.login.user.id);
					if (this.$route.params.id == this.login.user.id) {
						this.user = this.login.user;
					} else {
						this.getOneUser();
					}
				}
			},
			{ immediate: true }
		);
	},
	methods: {
		...mapActions(["toggleModal"]),

		async getOneUser() {
			try {
				this.user = await this.$store.dispatch(
					"getOneUser",
					this.$route.params.id
				);
			} catch (err) {
				handleError(err, this, "get one user");
			}
		},

		logout() {
			this.$store.dispatch("logout");
			this.$router.push("/login");
		},

		async updateUser(newUser) {
			const payload = {
				userId: this.user.id,
				newUser,
			};
			try {
				const data = await this.$store.dispatch("updateUser", payload);
				console.log(data);
				this.user.username = newUser.username;
				this.toggleModal(this.$refs.updateInfosModal);
			} catch (err) {
				console.error(err);
			}
		},

		async updateUserPicture(newPicture) {
			const payload = {
				userId: this.user.id,
				newPicture,
			};
			try {
				const data = await this.$store.dispatch("updateUserPicture", payload);
				console.log(data);
				this.user.picture = data.pictureUpdated;
				this.toggleModal(this.$refs.updatePictureModal);
			} catch (err) {
				console.error(err);
			}
		},

		async deleteAccount() {
			if (!confirm("Do you really want to delete the account?")) return;

			try {
				const data = await this.$store.dispatch("deleteAccount", this.user.id);
				console.log(data);
			} catch (err) {
				console.error(err);
			}

			if (this.login.user.role === this.userRoles.admin) this.$router.push("/");
			else this.logout();
		},
	},
};
</script>

<style lang="scss" scoped>
.profile-view {
	padding: 1rem;
}

div > * {
	display: block;
}

img {
	height: 100px;
}

button {
	margin-top: 0.5rem;
}
</style>
