<template>
	<div>
		<h1>Profile<span v-if="notFound"> not found</span></h1>
		<div v-if="!notFound">
			<img :src="`${apiRoot}/images/${user.picture}`" alt="profile picture" />
			<form
				v-if="login.userId == this.$route.params.id"
				@submit.prevent="onSubmit"
			>
				<input type="file" required />
				<button type="submit">Update pic</button>
			</form>
			<span>Username: {{ user.username }}</span>
			<span>
				Creation date: {{ new Date(user.creationDate).toLocaleDateString() }}
			</span>
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

		async onSubmit() {
			const newPicture = document.querySelector("input").files[0];

			try {
				const data = await this.$store.dispatch("updatePicture", newPicture);
				console.log(data);
				this.user.picture = data.newPicture;
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
</style>
