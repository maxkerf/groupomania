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
	grid-column: 1 / -1;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	width: 100%;
	max-height: 200px;
	overflow: hidden scroll;
	margin-top: 1rem;
}

.get-more-comments-btn {
	margin-bottom: 1rem;
}
</style>
