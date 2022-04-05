<template>
	<div class="comments-box">
		<CommentBox
			v-for="comment in comments"
			:key="comment.id"
			:comment="comment"
			@delete-comment="comment => $emit('delete-comment', comment)"
		/>
	</div>
</template>

<script>
import CommentBox from "./CommentBox.vue";

export default {
	components: {
		CommentBox,
	},
	props: ["comments"],
};
</script>

<style lang="scss" scoped>
.comments-box {
	grid-column: 1 / -1;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
}
</style>
