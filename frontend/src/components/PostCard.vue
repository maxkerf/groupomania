<template>
	<article ref="article">
		<img
			class="user-picture"
			:src="`${apiRoot}/images/user/${post.user_picture}`"
			alt="profile picture"
		/>
		<router-link
			class="username"
			:to="{ name: 'profile', params: { id: post.user_id } }"
			>{{ post.user_username }}</router-link
		>
		<DropdownBox v-if="post.user_id === login.userId" attachedElement="post">
			<button @click="$emit('launch-post-update', post)">Update</button>
			<button @click="$emit('delete-post', post)">Delete</button>
		</DropdownBox>
		<span class="date">{{ new Date(post.creationDate).toLocaleString() }}</span>
		<p v-if="post.text">{{ post.text }}</p>
		<img
			class="post-image"
			v-if="post.image"
			:src="`${apiRoot}/images/post/${post.image}`"
			alt="image"
		/>
		<div class="article-footer">
			<ReactionBox
				:type="reactionTypes.like"
				:postReactions="post.reactions"
				:userId="login.userId"
				@react="react"
			/>
			<ReactionBox
				:type="reactionTypes.dislike"
				:postReactions="post.reactions"
				:userId="login.userId"
				@react="react"
			/>
			<ReactionBox
				:type="reactionTypes.love"
				:postReactions="post.reactions"
				:userId="login.userId"
				@react="react"
			/>
			<ReactionBox
				:type="reactionTypes.laugh"
				:postReactions="post.reactions"
				:userId="login.userId"
				@react="react"
			/>
			<button
				title="Show/hide comments"
				@click="showComments = !showComments"
				class="comments-btn"
			>
				{{ formatNumberComments }}
			</button>
		</div>
		<CommentsBox
			v-show="showComments"
			:comments="comments"
			:nbComments="nbComments"
			@get-more-comments="getPostComments(comments.length)"
			@delete-comment="deleteComment"
			@update-comment="updateComment"
		/>
		<AddCommentForm @add-comment="addComment" />
	</article>
</template>

<script>
import { mapState } from "vuex";
import ReactionBox from "./ReactionBox.vue";
import AddCommentForm from "./AddCommentForm.vue";
import CommentsBox from "./CommentsBox.vue";
import DropdownBox from "./DropdownBox.vue";
import handleError from "../handleError.js";

export default {
	components: {
		ReactionBox,
		AddCommentForm,
		CommentsBox,
		DropdownBox,
	},
	data() {
		return {
			comments: [],
			nbComments: 0,
			showComments: true,
			showDropdownMenu: false,
		};
	},
	props: ["post"],
	computed: {
		...mapState(["login", "apiRoot", "reactionTypes"]),

		formatNumberComments() {
			if (this.nbComments === 0) return "No comment";
			else if (this.nbComments === 1) return "1 comment";

			return `${this.nbComments} comments`;
		},
	},
	created() {
		this.getPostComments();
		this.getNumberComments();
	},
	methods: {
		react(type) {
			this.$emit("react", this.post.id, type);
		},

		async addComment(comment) {
			try {
				const payload = {
					postId: this.post.id,
					comment,
				};

				const data = await this.$store.dispatch("addComment", payload);
				console.log(data);

				this.comments.push(data.commentCreated);
				this.nbComments++;
				this.showComments = true;
			} catch (err) {
				handleError(err, this, "add comment");
			}
		},

		async getPostComments(offset = 0) {
			try {
				const payload = {
					postId: this.post.id,
					offset,
				};
				const comments = await this.$store.dispatch("getPostComments", payload);
				comments.reverse();
				this.comments = [...comments, ...this.comments];
			} catch (err) {
				handleError(err, this, "get post comments");
			}
		},

		async getNumberComments() {
			try {
				this.nbComments = await this.$store.dispatch(
					"getNumberComments",
					this.post.id
				);
			} catch (err) {
				handleError(err, this, "get number comments");
			}
		},

		async updateComment(commentId, newComment) {
			try {
				const payload = {
					postId: this.post.id,
					commentId,
					newComment,
				};

				const data = await this.$store.dispatch("updateComment", payload);
				console.log(data);

				const commentToUpdate = this.comments.find(
					comment => comment.id === commentId
				);
				if (commentToUpdate)
					Object.assign(commentToUpdate, data.commentUpdated);
			} catch (err) {
				handleError(err, this, "update comment");
			}
		},

		async deleteComment(comment) {
			if (!confirm("Do you really want to delete this comment?")) return;

			try {
				const payload = {
					postId: this.post.id,
					commentId: comment.id,
				};

				const data = await this.$store.dispatch("deleteComment", payload);
				console.log(data);

				this.comments.splice(this.comments.indexOf(comment), 1);
				this.nbComments--;
			} catch (err) {
				handleError(err, this, "delete comment");
			}
		},
	},
};
</script>

<style lang="scss" scoped>
article {
	border-left: solid 2px;
	padding-left: 0.5rem;
	margin-top: 1.5rem;
	display: grid;
	grid-template-rows: repeat(7, auto);
	grid-template-columns: 58px auto auto;
	justify-content: start;
	justify-items: start;
}

.user-picture {
	height: 50px;
	aspect-ratio: 1;
	object-fit: cover;
	object-position: top;
	border-radius: 50%;
	grid-row: 1 / 3;
	margin-right: 0.5rem;
}

.username {
	font-weight: 500;

	&:hover {
		text-decoration: underline;
	}
}

.dropdown-box {
	margin-left: 1rem;
	position: relative;
	display: flex;
	justify-self: end;
}

.dropdown-btn {
	border: unset;
	background: unset;
	cursor: pointer;
	padding: 0.125rem 0.375rem;
	border-radius: 1rem;

	&:hover {
		background-color: #ddd;
	}
}

.dropdown-menu {
	position: absolute;
	top: 25px;
}

.date {
	grid-row-start: 2;
}

p {
	grid-column: 1 / -1;
	margin: 0;
	margin-top: 1rem;
}

.post-image {
	grid-column: 1 / -1;
	width: 300px;
	margin-top: 1rem;
}

.article-footer {
	grid-column: 1 / -1;
	margin-top: 1rem;
	display: flex;
	gap: 0.5rem;
}
</style>
