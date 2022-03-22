<template>
	<article>
		<img
			class="user-picture"
			:src="`${apiRoot}/images/user/${post.user_picture}`"
			alt="profile picture"
		/>
		<router-link :to="{ name: 'profile', params: { id: post.user_id } }">{{
			post.username
		}}</router-link>
		<span>{{ new Date(post.creationDate).toLocaleString() }}</span>
		<p v-if="post.text">{{ post.text }}</p>
		<img
			class="post-image"
			v-if="post.image"
			:src="`${apiRoot}/images/post/${post.image}`"
			alt="image"
		/>
		<div class="article-footer">
			<button @click="$emit('react', post.id, 1)">
				<i class="fa-solid fa-thumbs-up"></i>
			</button>
			<button @click="$emit('react', post.id, 0)">
				<i class="fa-solid fa-thumbs-down"></i>
			</button>
			<button
				v-if="post.user_id === login.userId"
				@click="$emit('delete-post', post)"
			>
				Delete
			</button>
		</div>
	</article>
</template>

<script>
import { mapState } from "vuex";

export default {
	props: ["post"],
	computed: {
		...mapState(["login", "apiRoot"]),
	},
};
</script>

<style lang="scss" scoped>
article {
	border-left: solid 2px;
	padding-left: 0.5rem;
	margin-top: 1.5rem;
	display: grid;
	grid-template-rows: repeat(5, auto);
	grid-template-columns: 58px auto;
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
	margin-top: 1rem;
	display: flex;
	align-items: center;
	gap: 0.5rem;
}
</style>
