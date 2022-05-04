<template>
	<article class="post-card" ref="article">
		<div class="post-card-header">
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
			<DropdownBox
				v-if="
					login.user.role === userRoles.admin || post.user_id === login.user.id
				"
				attachedElement="post"
			>
				<DropdownMenuBtn
					@click="$emit('launch-post-update', post)"
					name="Update"
					icon="fa-solid fa-pen"
				/>
				<DropdownMenuBtn
					@click="$emit('delete-post', post)"
					name="Delete"
					icon="fa-solid fa-x"
				/>
			</DropdownBox>
			<DateBox
				class="date"
				:creationDate="post.creationDate"
				:lastUpdate="post.lastUpdate"
			/>
		</div>
		<div class="post-card-content">
			<p v-if="post.text" ref="text"></p>
			<img
				class="post-image"
				v-if="post.image"
				:src="`${apiRoot}/images/post/${post.image}`"
				alt="image"
			/>
		</div>
		<div class="community-feedbacks">
			<div>
				<div class="reactions-box">
					<ReactionBox
						:type="reactionTypes.like"
						:postReactions="post.reactions"
						:userId="login.user.id"
						@react="react"
					/>
					<ReactionBox
						:type="reactionTypes.dislike"
						:postReactions="post.reactions"
						:userId="login.user.id"
						@react="react"
					/>
					<ReactionBox
						:type="reactionTypes.love"
						:postReactions="post.reactions"
						:userId="login.user.id"
						@react="react"
					/>
					<ReactionBox
						:type="reactionTypes.laugh"
						:postReactions="post.reactions"
						:userId="login.user.id"
						@react="react"
					/>
				</div>
				<button
					v-if="nbComments"
					title="Show/hide comments"
					@click="toggleComments"
					class="comments-btn"
				>
					{{ formatNumberComments }}
				</button>
			</div>
			<div class="linebreak"><hr /></div>
			<CommentsBox
				v-show="showComments"
				:comments="comments"
				:nbComments="nbComments"
				@get-more-comments="getMoreComments"
				@delete-comment="deleteComment"
				@update-comment="updateComment"
				ref="commentsBox"
			/>
			<AddCommentForm @add-comment="addComment" />
		</div>
	</article>
</template>

<script>
import { mapState } from "vuex";
import ReactionBox from "./ReactionBox.vue";
import AddCommentForm from "./AddCommentForm.vue";
import CommentsBox from "./CommentsBox.vue";
import DropdownBox from "./DropdownBox.vue";
import DropdownMenuBtn from "./DropdownMenuBtn.vue";
import DateBox from "./DateBox.vue";
import handleError from "../handleError.js";

export default {
	components: {
		ReactionBox,
		AddCommentForm,
		CommentsBox,
		DropdownBox,
		DropdownMenuBtn,
		DateBox,
	},
	data() {
		return {
			comments: [],
			nbComments: 0,
			showComments: false,
			showDropdownMenu: false,
		};
	},

	props: ["post"],

	computed: {
		...mapState(["login", "apiRoot", "reactionTypes", "userRoles"]),

		formatNumberComments() {
			return `${this.nbComments} comment${this.nbComments === 1 ? "" : "s"}`;
		},
	},

	watch: {
		async "post.text"() {
			await this.$nextTick();
			if (this.post.text) this.formatText();
		},
	},

	created() {
		this.getNumberComments();
	},

	mounted() {
		if (this.post.text) this.formatText();
	},

	methods: {
		formatText() {
			// clear
			this.$refs.text.innerText = "";
			// add line break elements
			this.post.text.split("\n").forEach(el => {
				this.$refs.text.innerText += el;
				this.$refs.text.appendChild(document.createElement("br"));
			});
		},

		toggleComments() {
			this.showComments = !this.showComments;
			if (this.comments.length === 0) this.getPostComments();
		},

		async getMoreComments(cb) {
			await this.getPostComments(this.comments.length);
			cb();
		},

		react(type) {
			this.$emit("react", this.post.id, type);
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

		async addComment(comment) {
			try {
				const payload = {
					postId: this.post.id,
					comment,
				};

				const data = await this.$store.dispatch("addComment", payload);
				console.log(data);

				this.showComments = true;
				await this.$nextTick();
				this.nbComments++;
				this.comments = [...this.comments, data.commentCreated]; // this way (not push) to trigger the watcher
			} catch (err) {
				handleError(err, this, "add comment");
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
.post-card {
	background-color: #242526;
	color: #e4e6eb;
	width: 400px;
	border-radius: 0.75rem;

	/* position: relative; */
	/* &::after {
		content: "";
		background-color: red;
		top: 0;
		width: 50%;
		height: 100%;
		position: absolute;
	} */
}

.post-card-header {
	display: grid;
	grid-template-columns: auto 1fr auto;
	grid-template-rows: repeat(2, 1fr);
	padding: 0.75rem;
	padding-bottom: 0;
}

.user-picture {
	grid-row: span 2;
	height: 3em;
	width: 3em;
	border-radius: 50%;
	object-fit: cover;
	margin-right: 0.5rem;
}

.username {
	justify-self: start;
	align-self: flex-end;
	text-decoration: none;
	color: #e4e6eb;
	font-weight: 500;

	&:hover {
		text-decoration: underline;
	}
}

.dropdown-box {
	grid-row: span 2;
	align-self: flex-start;
	margin-left: 1rem;
}

.date {
	grid-column-start: 2;
	grid-row-start: 2;
	align-self: flex-start;
}

.post-card-content {
	p {
		padding: 0 0.75rem;
		margin: 0;
		margin-top: 0.75rem;
		overflow-wrap: anywhere;
	}

	img {
		display: block;
		width: 100%;
		margin-top: 0.75rem;
	}
}

.community-feedbacks {
	& > div:nth-child(1) {
		display: flex;
		justify-content: space-between;
		padding: 0.5rem 0.75rem;
	}
}

.reactions-box {
	display: flex;
	gap: 0.5rem;
}

.comments-btn {
	border: unset;
	background-color: unset;
	padding: unset;
	font-family: unset;
	font-size: 0.875rem;
	cursor: pointer;
	color: #b0b3b8;

	&:hover {
		text-decoration: underline;
		color: #ffd7d7;
	}
}

.linebreak {
	padding: 0 0.75rem;

	& > hr {
		border: 0;
		border-top: 1px solid #515151;
		margin: 0;
	}
}
</style>
