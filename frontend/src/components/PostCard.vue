<template>
	<article>
		<img
			:src="`${apiRoot}/images/${post.user_picture}`"
			alt="profile picture"
		/>
		<router-link :to="{ name: 'profile', params: { id: post.user_id } }">{{
			post.username
		}}</router-link>
		<span>{{ new Date(post.creationDate).toLocaleString() }}</span>
		<p>{{ post.text }}</p>
		<button
			v-if="post.user_id === login.userId"
			@click="$emit('delete-post', post)"
		>
			Delete
		</button>
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
	grid-template-rows: repeat(4, auto);
	grid-template-columns: repeat(2, auto);
	justify-content: start;
}

img {
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

button {
	margin-top: 1rem;
}
</style>