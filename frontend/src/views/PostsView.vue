<template>
	<div>
		<h1>Posts</h1>
		<article v-for="post in posts" :key="post.id" :ref="`post-${post.id}`">
			<img :src="post.user_picture" alt="profile picture" />
			<router-link :to="{ name: 'profile', params: { id: post.user_id } }">{{
				post.username
			}}</router-link>
			<span>{{ new Date(post.creationDate).toLocaleString() }}</span>
			<p>{{ post.text }}</p>
			<button v-if="post.user_id === login.userId" @click="deletePost(post.id)">
				Delete
			</button>
		</article>
		<router-link to="/">Home</router-link>
	</div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
	data() {
		return {
			posts: [],
		};
	},
	computed: {
		...mapState(["login"]),
	},
	methods: {
		...mapActions(["getPosts"]),

		async deletePost(id) {
			const DOMPost = this.$refs[`post-${id}`][0];

			try {
				const data = await this.$store.dispatch("deletePost", id);
				DOMPost.remove();
				console.log(data);
			} catch (err) {
				if (err.status === 401) {
					this.$store.dispatch("logout");
					this.$router.push("/login");
				}
				console.error(err);
			}
		},
	},
	async created() {
		if (this.login.userId === -1) return this.$router.push("/login");

		try {
			this.posts = await this.getPosts();
		} catch (err) {
			if (err.status === 401) {
				this.$store.dispatch("logout");
				this.$router.push("/login");
			}
			console.error(err);
		}
	},
};
</script>

<style lang="scss" scoped>
article {
	border-left: solid 2px;
	padding-left: 0.5rem;
	margin-bottom: 1.5rem;
	display: grid;
	grid-template-rows: repeat(4, auto);
	grid-template-columns: repeat(2, auto);
	justify-content: start;
}

img {
	height: 40px;
	aspect-ratio: 1;
	object-fit: cover;
	object-position: top;
	background-color: grey;
	padding: 0.25rem;
	border-radius: 50%;
	grid-row: 1 / 3;
	margin-right: 0.5rem;
}

p {
	grid-column: 1 / -1;
	margin: 0;
	margin-top: 1rem;
}

button {
	margin-top: 1rem;
}
</style>
