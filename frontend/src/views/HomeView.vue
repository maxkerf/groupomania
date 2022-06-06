<template>
	<div class="home-view" ref="homeView" @scroll="handleScroll">
		<button
			class="add-post-btn"
			@click="toggleModal($refs.createPostModal)"
			title="Add a post"
		>
			<i class="fa-solid fa-pen"></i>
		</button>
		<button
			v-show="showScrollTopBtn"
			class="scroll-top-btn"
			@click="scrollTop"
			title="Scroll to top"
		>
			<i class="fa-solid fa-angle-up"></i>
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
				Show more posts
			</button>
		</div>
		<ModalBox
			:toggleModal="toggleModal"
			ref="createPostModal"
			title="Add a post"
		>
			<AddPostForm @add-post="addPost" ref="addPostForm" />
		</ModalBox>
		<ModalBox
			:toggleModal="toggleModal"
			ref="updatePostModal"
			title="Update your post"
		>
			<UpdatePostForm
				:post="postToUpdate"
				@update-post="updatePost"
				ref="updatePostForm"
			/>
		</ModalBox>
	</div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import handleError from "../handleError.js";
import PostCard from "../components/PostCard.vue";
import AddPostForm from "../components/forms/AddPostForm.vue";
import UpdatePostForm from "../components/forms/UpdatePostForm.vue";
import ModalBox from "../components/ModalBox.vue";
import { focusFirstInvalidFormInput } from "../formValidation.js";

export default {
	data() {
		return {
			posts: [],
			nbPosts: 0,
			postToUpdate: {},
			showScrollTopBtn: false,
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
		if (this.login.user.id === -1) return this.$router.push("/login");

		this.getPosts();
		this.getNbPosts();
	},

	methods: {
		...mapActions(["toggleModal"]),

		launchPostUpdate(postToUpdate) {
			this.postToUpdate = postToUpdate;
			this.toggleModal(this.$refs.updatePostModal);
		},

		scrollTop() {
			this.$refs.homeView.scroll({ top: 0, behavior: "smooth" });
		},

		handleScroll(e) {
			this.showScrollTopBtn = e.srcElement.scrollTop > 200;
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
				this.scrollTop();
			} catch (err) {
				handleError(err, this, "add post");
				// if there are errors on the inputs
				if (err.errors) {
					err.errors?.forEach(e => {
						this.$refs.addPostForm.errors[e.param] = `${e.msg}.`;
					});
					focusFirstInvalidFormInput(this.$refs.addPostForm);
				} else {
					this.$refs.addPostForm.errors.global = `${err.message}.`;
				}
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
				// if there are errors on the inputs
				if (err.errors) {
					err.errors?.forEach(e => {
						this.$refs.updatePostForm.errors[e.param] = `${e.msg}.`;
					});
					focusFirstInvalidFormInput(this.$refs.updatePostForm);
				} else {
					this.$refs.updatePostForm.errors.global = `${err.message}.`;
				}
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
	overflow: hidden scroll;
	position: relative;
	// useless transform property to be the fixed buttons ancestor (cf. position fixed wiki)
	/* transform: translate(0); */
}

.post-cards-box {
	padding: 1rem;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	align-items: center;
}

.add-post-btn {
	position: fixed;
	left: 50%;
	// card/2 + btn + scrollbar/2 + gap
	transform: translateX(calc((200px + 100% + 10px + 0.5rem) * -1));
	//transform: translateX(calc((200px + 100% + 0.5rem) * -1));
	border: unset;
	padding: unset;
	cursor: pointer;
	font-size: 1.25rem;
	margin-top: 1rem;
	display: grid;
	place-items: center;
	background-color: #242526;
	color: #e4e6eb;
	width: 2em;
	height: 2em;
	border-radius: 50%;

	/* z-index: 10;
	background-color: green;
	border-radius: unset; */

	&:hover {
		color: #ffd7d7;
	}
}

.scroll-top-btn {
	position: fixed;
	bottom: 86px;
	left: 50%;
	transform: translateX(200px); // card/2
	border: unset;
	padding: unset;
	cursor: pointer;
	font-size: 1.25rem;
	margin-top: 1rem;
	display: grid;
	place-items: center;
	background-color: #242526;
	color: #e4e6eb;
	width: 2em;
	height: 2em;
	border-radius: 50%;

	&:hover {
		color: #ffd7d7;
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

.show-more-posts-btn {
	@include reset-btn();
	cursor: pointer;
	color: #e4e6eb;
	font-size: 0.875em;

	&:hover {
		text-decoration: underline;
		color: #ffd7d7;
	}
}
</style>
