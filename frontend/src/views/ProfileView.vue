<template>
	<div>
		<h1>Profile<span v-if="notFound"> not found</span></h1>
		<div v-if="!notFound">
			<img :src="`${apiRoot}/images/${user.picture}`" alt="profile picture" />
			<button
				v-if="login.userId == this.$route.params.id"
				@click="updatingPicture = !updatingPicture"
			>
				<i v-show="updatingPicture" class="fa-solid fa-caret-up"></i>
				<i v-show="!updatingPicture" class="fa-solid fa-caret-down"></i>
				<span> Update picture</span>
			</button>
			<form
				v-show="updatingPicture"
				v-if="login.userId == this.$route.params.id"
				@submit.prevent="updateUserPicture"
			>
				<label for="picture">Picture</label>
				<input id="picture" type="file" required />
				<button type="submit">Save</button>
			</form>
			<hr />
			<span>Username: {{ user.username }}</span>
			<span>
				Creation date: {{ new Date(user.creationDate).toLocaleDateString() }}
			</span>
			<button
				v-if="login.userId == this.$route.params.id"
				@click="updating = !updating"
			>
				<i v-show="updating" class="fa-solid fa-caret-up"></i>
				<i v-show="!updating" class="fa-solid fa-caret-down"></i>
				<span> Update</span>
			</button>
			<form
				v-show="updating"
				v-if="login.userId == this.$route.params.id"
				@submit.prevent="updateUser"
			>
				<label for="username">Username</label>
				<input id="username" type="text" :value="user.username" />
				<button type="submit">Save</button>
			</form>
			<hr />
			<button v-if="login.userId == this.$route.params.id" @click="logout">
				Logout
			</button>
			<button
				v-if="login.userId == this.$route.params.id"
				@click="deleteAccount"
			>
				Delete account
			</button>
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex";

export default {
	data() {
		return {
			notFound: false,
			user: {
				picture: "user.svg",
			},
			updating: false,
			updatingPicture: false,
		};
	},
	computed: {
		...mapState(["login", "apiRoot"]),
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

		async deleteAccount() {
			if (!confirm("Do you really want to delete your account?")) return;

			try {
				const data = await this.$store.dispatch("deleteAccount");
				console.log(data);
			} catch (err) {
				console.error(err);
			}

			this.logout();
		},

		async updateUserPicture() {
			const newPicture = document.querySelector("#picture").files[0];

			try {
				const data = await this.$store.dispatch(
					"updateUserPicture",
					newPicture
				);
				console.log(data);
				this.user.picture = data.newPicture;
				this.updatingPicture = false;
			} catch (err) {
				console.error(err);
			}
		},

		async updateUser() {
			const username = document.querySelector("#username").value;
			const newUser = { username };

			try {
				const data = await this.$store.dispatch("updateUser", newUser);
				console.log(data);
				this.updating = false;
				this.user.username = username;
			} catch (err) {
				console.error(err);
			}
		},
	},
};
</script>

<style lang="scss" scoped>
div > * {
	display: block;

	& + * {
		margin-top: 0.5rem;
	}
}

img {
	height: 100px;
}

form {
	border-left: 2px solid;
	padding-left: 0.25rem;

	& > * {
		display: block;
	}

	button {
		margin-top: 0.25rem;
	}
}
</style>
