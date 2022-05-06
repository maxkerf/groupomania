<template>
	<div class="profile-view">
		<div class="profile-card">
			<button
				class="user-picture-btn"
				v-if="isAdmin || isSelf"
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
				v-if="!isAdmin && !isSelf"
				class="user-picture"
				:src="userPictureSource"
				alt="profile picture"
			/>
			<span class="username">{{ user.username }}</span>
			<span class="date">
				Since {{ new Date(user.creationDate).toLocaleDateString() }}
			</span>
			<div class="btn-box" v-if="isAdmin || isSelf">
				<ProfileCardBtn
					v-if="isSelf"
					icon="fa-solid fa-right-from-bracket"
					title="Logout"
					@click="logout"
				/>
				<ProfileCardBtn
					icon="fa-solid fa-pen"
					title="Update profile"
					@click="toggleModal($refs.updateInfosModal)"
				/>
				<ProfileCardBtn
					icon="fa-solid fa-trash-can"
					title="Delete account"
					@click="deleteAccount"
				/>
			</div>
		</div>
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
		<ModalBox
			:toggleModal="toggleModal"
			ref="updateInfosModal"
			title="Update profile"
		>
			<UpdateUserInfosForm :user="user" @update-user="updateUser" />
		</ModalBox>
	</div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import UpdateUserPictureForm from "../components/UpdateUserPictureForm.vue";
import UpdateUserInfosForm from "../components/UpdateUserInfosForm.vue";
import ModalBox from "../components/ModalBox.vue";
import ProfileCardBtn from "../components/ProfileCardBtn.vue";
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
		ProfileCardBtn,
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

		isAdmin() {
			return this.login.user.role === this.userRoles.admin;
		},

		isSelf() {
			return this.login.user.id == this.$route.params.id;
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
.profile-card {
	margin: 0 auto;
	margin-top: 3rem;
	width: fit-content;
	display: grid;
	justify-items: center;
	gap: 0.5rem;
	color: #e4e6eb;
	position: relative;
	z-index: 0;
	padding: 0 1rem 1rem 1rem;

	&::before {
		content: "";
		position: absolute;
		top: 3em;
		bottom: 0;
		width: 100%;
		background-color: #242526;
		z-index: -1;
		border-radius: 0.75rem;
	}
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

.username {
	font-size: 1.5rem;
	font-weight: 500;
}

.date {
	font-style: italic;
}

.btn-box {
	display: flex;
	gap: 0.75rem;
	margin-top: 0.5rem;
}
</style>
