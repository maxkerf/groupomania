<template>
	<div class="comments-box">
		<CommentBox
			v-for="comment in comments"
			:key="comment.id"
			:comment="comment"
			@delete-comment="comment => $emit('delete-comment', comment)"
		/>
		<button
			class="get-more-comments-btn"
			v-show="comments.length !== nbComments"
			@click="$emit('get-more-comments')"
		>
			Show more comments
		</button>
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
}

.get-more-comments-btn {
	margin-top: 1rem;
}
</style>
