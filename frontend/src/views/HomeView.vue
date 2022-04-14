<template>
	<div class="home-view">
		<button class="add-post-btn" @click="toggleModal($refs.createPostModal)">
			Add post
		</button>
		<div class="post-cards-box" ref="postCardsBox">
			<PostCard
				v-for="post in posts"
				:key="post.id"
				:post="post"
				@react="react"
				@delete-post="deletePost"
				@launch-post-update="launchPostUpdate"
			/>
			<button
				@click="getPosts"
				v-show="posts.length !== nbPosts"
				class="show-more-posts-btn"
			>
				Show more
			</button>
		</div>
		<ModalBox :toggleModal="toggleModal" ref="createPostModal">
			<AddPostForm @add-post="addPost" />
		</ModalBox>
		<ModalBox :toggleModal="toggleModal" ref="updatePostModal">
			<UpdatePostForm :post="postToUpdate" @update-post="updatePost" />
		</ModalBox>
	</div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import handleError from "../handleError.js";
import PostCard from "../components/PostCard.vue";
import AddPostForm from "../components/AddPostForm.vue";
import UpdatePostForm from "../components/UpdatePostForm.vue";
import ModalBox from "../components/ModalBox.vue";

export default {
	data() {
		return {
			posts: [],
			nbPosts: 0,
			postToUpdate: {},
		};
	},
	components: {
		PostCard,
		AddPostForm,
		UpdatePostForm,
		ModalBox,
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
		...mapActions(["toggleModal"]),

		launchPostUpdate(postToUpdate) {
			this.postToUpdate = postToUpdate;
			this.toggleModal(this.$refs.updatePostModal);
		},

		/* REQUESTS */

		async getPosts() {
			try {
				const posts = await this.$store.dispatch("getPosts", this.posts.length);
				this.posts = [...this.posts, ...posts];
			} catch (err) {
				handleError(err, this, "get posts");
			}
		},

		async getNbPosts() {
			try {
				this.nbPosts = await this.$store.dispatch("countPosts");
			} catch (err) {
				handleError(err, this, "get posts number");
			}
		},

		async addPost(post) {
			try {
				const data = await this.$store.dispatch("addPost", post);
				console.log(data);
				this.posts = [data.postCreated, ...this.posts];
				this.nbPosts++;
				this.toggleModal(this.$refs.createPostModal);
				this.$refs.postCardsBox.scroll({ top: 0, behavior: "smooth" });
			} catch (err) {
				handleError(err, this, "add post");
			}
		},

		async updatePost(postId, newPost) {
			const payload = {
				postId,
				newPost,
			};

			try {
				const data = await this.$store.dispatch("updatePost", payload);
				console.log(data);
				const postToUpdate = this.posts.find(post => post.id === postId);
				if (postToUpdate) Object.assign(postToUpdate, data.postUpdated);
				this.toggleModal(this.$refs.updatePostModal);
			} catch (err) {
				handleError(err, this, "update post");
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
				handleError(err, this, "delete post");
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
				handleError(err, this, "react");
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.home-view {
	overflow: hidden;
	display: grid;
	grid-template-rows: auto 1fr;
}

.add-post-btn {
	margin: 1rem;
	justify-self: center;
}

.post-cards-box {
	background-color: #eee;
	overflow: hidden scroll;
	padding: 1rem;
}

.show-more-posts-btn {
	margin-top: 1.5rem;
}
</style>
