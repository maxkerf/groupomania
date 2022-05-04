<template>
	<div class="comments-box" ref="commentsBox" @scroll="onCommentsBoxScroll">
		<button
			class="get-more-comments-btn"
			v-show="comments.length < nbComments && showGetMoreCommentsBtn"
			@click="onGetMoreCommentsBtnClick"
		>
			Show 3 more comments
		</button>
		<CommentBox
			v-for="comment in comments"
			:key="comment.id"
			:comment="comment"
			@delete-comment="comment => $emit('delete-comment', comment)"
			@update-comment="
				(commentId, newComment) =>
					$emit('update-comment', commentId, newComment)
			"
		/>
	</div>
</template>

<script>
import CommentBox from "./CommentBox.vue";

export default {
	data() {
		return {
			showGetMoreCommentsBtn: true,
		};
	},

	components: {
		CommentBox,
	},

	props: ["comments", "nbComments"],

	watch: {
		async comments(newValue, oldValue) {
			await this.$nextTick();
			// scroll top when comments are added to the beginning
			// in fact, show new comments in the post comments list
			newValue[newValue.length - 1].id === oldValue[oldValue.length - 1]?.id
				? this.scrollTop()
				: this.scrollBottom();
		},
	},

	methods: {
		onCommentsBoxScroll(e) {
			const dropdownMenus =
				this.$refs.commentsBox.querySelectorAll(".dropdown-menu");

			// dropdown menu is absolute so it follows the scroll
			// here I replace it depending on the scroll
			dropdownMenus.forEach(
				el =>
					(el.style.marginTop = `calc(${-e.srcElement.scrollTop}px + 0.2em)`)
			);
		},

		scrollTop() {
			this.$refs.commentsBox.scroll({ top: 0 });
		},

		scrollBottom() {
			this.$refs.commentsBox.scroll({ top: Math.pow(10, 6) });
		},

		onGetMoreCommentsBtnClick() {
			this.showGetMoreCommentsBtn = false;
			this.$emit(
				"get-more-comments",
				() => (this.showGetMoreCommentsBtn = true)
			);
		},
	},
};
</script>

<style lang="scss" scoped>
.comments-box {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 0.5rem;
	width: 100%;
	max-height: 226px;
	overflow: hidden scroll;
	padding: 0 0.75rem;
	box-sizing: border-box;
	margin-top: 0.75rem;
}

.get-more-comments-btn {
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
</style>
