<template>
	<div class="comments-box">
		<button
			class="get-more-comments-btn"
			v-show="comments.length !== nbComments"
			@click="$emit('get-more-comments')"
		>
			Show more comments
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
	components: {
		CommentBox,
	},
	props: ["comments", "nbComments"],
};
</script>

<style lang="scss" scoped>
.comments-box {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 0.5rem;
	width: 100%;
	max-height: 200px;
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
