<template>
	<div class="profile-view">
		<span v-if="notFound">Profile not found</span>
		<div v-if="!notFound">
			<img
				:src="`${apiRoot}/images/user/${user.picture}`"
				alt="profile picture"
			/>
			<button
				v-if="
					login.userRole === userRoles.admin ||
					login.userId == this.$route.params.id
				"
				@click="toggleModal($refs.updatePictureModal)"
			>
				Update picture
			</button>
			<ModalBox :toggleModal="toggleModal" ref="updatePictureModal">
				<UpdateUserPictureForm @update-user-picture="updateUserPicture" />
			</ModalBox>
			<hr />
			<span>Username: {{ user.username }}</span>
			<span>
				Creation date: {{ new Date(user.creationDate).toLocaleDateString() }}
			</span>
			<button
				v-if="
					login.userRole === userRoles.admin ||
					login.userId == this.$route.params.id
				"
				@click="toggleModal($refs.updateInfosModal)"
			>
				Update infos
			</button>
			<ModalBox :toggleModal="toggleModal" ref="updateInfosModal">
				<UpdateUserForm :user="user" @update-user="updateUser" />
			</ModalBox>
			<hr />
			<button v-if="login.userId == this.$route.params.id" @click="logout">
				Logout
			</button>
			<button
				v-if="
					login.userRole === userRoles.admin ||
					login.userId == this.$route.params.id
				"
				@click="deleteAccount"
			>
				Delete account
			</button>
		</div>
	</div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import UpdateUserPictureForm from "../components/UpdateUserPictureForm.vue";
import UpdateUserForm from "../components/UpdateUserForm.vue";
import ModalBox from "../components/ModalBox.vue";

export default {
	data() {
		return {
			notFound: false,
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
		if (this.login.userId === -1) return this.$router.push("/login");

		this.$watch(
			() => {
				return this.$route.params.id;
			},
			() => {
				if (this.$route.name === "profile") this.getOneUser();
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
				switch (err.status) {
					case 401:
						this.logout();
						break;
					case 404:
						this.notFound = true;
						break;
					default:
				}
				console.error(err);
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

			if (this.login.userRole === this.userRoles.admin) this.$router.push("/");
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
