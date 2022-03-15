<template>
	<div>
		<h1>Home</h1>
		<AddPostForm @add-post="addPost" />
		<PostCard
			v-for="post in posts"
			:key="post.id"
			:post="post"
			@delete-post="deletePost"
		/>
		<button @click="getPosts" v-show="posts.length !== nbPosts">
			Show more
		</button>
	</div>
</template>

<script>
import { mapState } from "vuex";
import AddPostForm from "../components/AddPostForm.vue";
import PostCard from "../components/PostCard.vue";

export default {
	data() {
		return {
			posts: [],
			nbPosts: 0,
		};
	},
	components: {
		AddPostForm,
		PostCard,
	},
	computed: {
		...mapState(["login"]),
	},
	async created() {
		if (this.login.userId === -1) return this.$router.push("/login");

		this.getPosts();
		this.nbPosts = await this.$store.dispatch("countPosts");
	},
	methods: {
		async addPost(post) {
			try {
				const data = await this.$store.dispatch("addPost", post);
				console.log(data);
				const postCreated = await this.$store.dispatch("getPost", data.postId);
				this.posts = [postCreated, ...this.posts];
				this.nbPosts++;
			} catch (err) {
				console.error(err);
			}
		},

		async getPosts() {
			try {
				const posts = await this.$store.dispatch("getPosts", this.posts.length);
				this.posts = [...this.posts, ...posts];
			} catch (err) {
				if (err.status === 401) {
					this.$store.dispatch("logout");
					this.$router.push("/login");
				}
				console.error(err);
			}
		},

		async deletePost(post) {
			if (!confirm("Do you really want to delete this post?")) return;

			try {
				const data = await this.$store.dispatch("deletePost", post.id);
				console.log(data);
				this.posts.splice(this.posts.indexOf(post), 1);
				this.nbPosts--;
			} catch (err) {
				if (err.status === 401) {
					this.$store.dispatch("logout");
					this.$router.push("/login");
				}
				console.error(err);
			}
		},
	},
};
</script>

<style lang="scss" scoped>
button {
	margin-top: 1.5rem;
}
</style>
