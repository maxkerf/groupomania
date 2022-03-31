<template>
	<div>
		<AddPostForm @add-post="addPost" />
		<PostCard
			v-for="post in posts"
			:key="post.id"
			:post="post"
			@react="react"
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
	created() {
		if (this.login.userId === -1) return this.$router.push("/login");

		this.getPosts();
		this.getNbPosts();
	},
	methods: {
		handleError(err, requestName = "accomplish request") {
			console.error(`Failed to ${requestName} ✖\n`, err);
			if (err.status === 401) {
				this.$store.dispatch("logout");
				this.$router.push("/login");
			}
		},

		async getPosts() {
			try {
				const posts = await this.$store.dispatch("getPosts", this.posts.length);
				this.posts = [...this.posts, ...posts];
			} catch (err) {
				this.handleError(err, "get posts");
			}
		},

		async getNbPosts() {
			try {
				this.nbPosts = await this.$store.dispatch("countPosts");
			} catch (err) {
				this.handleError(err, "get posts number");
			}
		},

		async addPost(post) {
			try {
				const data = await this.$store.dispatch("addPost", post);
				console.log(data);
				const postCreated = data.postCreated;
				postCreated.reactions = [];
				this.posts = [postCreated, ...this.posts];
				this.nbPosts++;
			} catch (err) {
				this.handleError(err, "add post");
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
				this.handleError(err, "delete post");
			}
		},

		async react(postId, type) {
			try {
				const data = await this.$store.dispatch("react", { postId, type });
				console.log(data);
				const post = this.posts.find(post => post.id === postId);
				post.reactions = await this.$store.dispatch(
					"getOnePostReactions",
					postId
				);
			} catch (err) {
				this.handleError(err);
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
