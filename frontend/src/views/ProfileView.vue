<template>
	<div class="profile-view">
		<button
			class="user-picture-btn"
			v-if="
				login.user.role === userRoles.admin ||
				login.user.id == this.$route.params.id
			"
			@click="toggleModal($refs.updatePictureModal)"
		>
			<img
				class="user-picture"
				:src="userPictureSource"
				alt="profile picture"
			/>
			<div class="user-picture-btn-overlay">
				<i class="fa-solid fa-pen"></i>
			</div>
		</button>
		<img
			v-if="
				login.user.role !== userRoles.admin &&
				login.user.id != this.$route.params.id
			"
			class="user-picture"
			:src="userPictureSource"
			alt="profile picture"
		/>
		<ModalBox
			:toggleModal="toggleModal"
			ref="updatePictureModal"
			title="Update profile picture"
		>
			<UpdateUserPictureForm
				:user="user"
				@update-user-picture="updateUserPicture"
			/>
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
			<UpdateUserInfosForm :user="user" @update-user="updateUser" />
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
import UpdateUserInfosForm from "../components/UpdateUserInfosForm.vue";
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
		UpdateUserInfosForm,
		ModalBox,
	},

	computed: {
		...mapState(["login", "apiRoot", "userRoles"]),

		userPictureSource() {
			return `${
				this.user.picture
					? `${this.apiRoot}/images/user/${this.user.picture}`
					: "/user.svg"
			}`;
		},
	},

	async created() {
		if (this.login.user.id === -1) return this.$router.push("/login");

		this.$watch(
			() => {
				return this.$route.params.id;
			},
			() => {
				if (this.$route.name === "profile") {
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

@mixin reset-btn {
	border: unset;
	background-color: unset;
	font-size: unset;
	font-family: unset;
	color: unset;
	padding: unset;
}

.user-picture-btn {
	@include reset-btn;
	cursor: pointer;
	position: relative;
	border-radius: 50%;

	&:hover {
		.user-picture-btn-overlay {
			opacity: 1;
		}
	}
}

.user-picture-btn-overlay {
	position: absolute;
	top: 0;
	bottom: 0;
	right: 0;
	left: 0;
	border-radius: inherit;
	background-color: rgba(0, 0, 0, 0.25);
	display: grid;
	place-items: center;
	font-size: 2.5em;
	color: #ffd7d7;
	opacity: 0;
	transition: opacity 100ms;
}

.user-picture {
	width: 6em;
	height: 6em;
	border-radius: 50%;
	object-fit: cover;
	vertical-align: bottom;
}
</style>
