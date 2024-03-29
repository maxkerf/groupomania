<template>
	<article class="post-card" ref="article">
		<div class="post-card-header">
			<router-link
				class="user-picture"
				:to="{ name: 'profile', params: { id: post.user_id } }"
			>
				<img :src="userPictureSource" alt="profile picture" />
			</router-link>
			<router-link
				class="username"
				:to="{ name: 'profile', params: { id: post.user_id } }"
			>
				{{ post.user_username }}
			</router-link>
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
				alt="post image"
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
import AddCommentForm from "./forms/AddCommentForm.vue";
import CommentsBox from "./CommentsBox.vue";
import DropdownBox from "./DropdownBox.vue";
import DropdownMenuBtn from "./DropdownMenuBtn.vue";
import DateBox from "./DateBox.vue";
import handleError from "../handleError.js";
import getUserPictureSource from "../getUserPictureSource.js";

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

		userPictureSource() {
			return getUserPictureSource(this.apiRoot, this.post.user_picture);
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
				if (!this.nbComments) this.showComments = false;
			} catch (err) {
				handleError(err, this, "delete comment");
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.post-card {
	background-color: $bg-color-1;
	color: $txt-color-1;
	width: 400px;
	max-width: 100%;
	border-radius: 0.75rem;
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
	margin-right: 0.5rem;

	&:hover {
		img {
			filter: brightness(1.1);
		}
	}

	img {
		height: 3em;
		width: 3em;
		border-radius: 50%;
		object-fit: cover;
	}
}

.username {
	justify-self: start;
	align-self: flex-end;
	text-decoration: none;
	color: $txt-color-1;
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
		height: 100%;
		margin-top: 0.75rem;
	}
}

.community-feedbacks {
	& > div:nth-child(1) {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 0.5rem 0.75rem;
		padding: 0.5rem 0.75rem;
		margin-top: 0.25rem;
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
	color: $txt-color-2;

	@media (any-hover: hover) {
		&:hover {
			text-decoration: underline;
			color: $contrast-color;
		}
	}
}

.linebreak {
	padding: 0 0.75rem;

	& > hr {
		border: 0;
		border-top: 1px solid $bg-color-2;
		margin: 0;
	}
}
</style>
