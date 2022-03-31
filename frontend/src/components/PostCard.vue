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
			<button @click="react(1)" :class="hasLiked ? 'liked' : ''">
				<i class="fa-solid fa-thumbs-up"></i>
			</button>
			<span>{{ nbLikes }}</span>
			<button @click="react(0)" :class="hasDisliked ? 'disliked' : ''">
				<i class="fa-solid fa-thumbs-down"></i>
			</button>
			<span>{{ nbDislikes }}</span>
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
	data() {
		return {
			reactions: [],
		};
	},
	props: ["post"],
	computed: {
		...mapState(["login", "apiRoot"]),

		hasLiked() {
			return Boolean(
				this.post.reactions.find(
					reaction =>
						reaction.user_id === this.login.userId && reaction.type === 1
				)
			);
		},

		hasDisliked() {
			return Boolean(
				this.post.reactions.find(
					reaction =>
						reaction.user_id === this.login.userId && reaction.type === 0
				)
			);
		},

		nbLikes() {
			return this.post.reactions.filter(reaction => reaction.type === 1).length;
		},

		nbDislikes() {
			return this.post.reactions.filter(reaction => reaction.type === 0).length;
		},
	},
	methods: {
		react(type) {
			this.$emit("react", this.post.id, type);
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

.liked {
	color: blue;
}

.disliked {
	color: red;
}
</style>
