<template>
	<div class="comment-box">
		<span
			class="date"
			:title="new Date(comment.creationDate).toLocaleString()"
			>{{ formatDate }}</span
		>
		<button
			v-if="comment.user_id === login.userId"
			@click="$emit('delete-comment', comment)"
			class="delete-btn"
		>
			Delete
		</button>
		<img
			class="profile-picture"
			:src="`${apiRoot}/images/user/${comment.user_picture}`"
			alt="user profile picture"
		/>
		<span class="username">{{ comment.user_username }}</span>
		<p class="comment">{{ comment.text }}</p>
	</div>
</template>

<script>
import { mapState } from "vuex";

export default {
	props: ["comment"],
	computed: {
		...mapState(["apiRoot", "login"]),

		formatDate() {
			const currentDate = new Date(Date.now());
			const creationDate = new Date(this.comment.creationDate);
			const diff = currentDate - creationDate;

			const s = Math.trunc(diff / 1000);
			const mn = Math.trunc(s / 60);
			const h = Math.trunc(mn / 60);
			const d = Math.trunc(h / 24);
			const m = this.getMonthDifference(creationDate, currentDate);
			const y = Math.trunc(m / 12);

			const result = y
				? `${y}y`
				: m
				? `${m}m`
				: d
				? `${d}d`
				: h
				? `${h}h`
				: mn
				? `${mn}mn`
				: s
				? `${s}s`
				: "0s";

			return `${result} ago`;
		},
	},
	methods: {
		getMonthDifference(startDate, endDate) {
			return (
				endDate.getMonth() -
				startDate.getMonth() +
				12 * (endDate.getFullYear() - startDate.getFullYear())
			);
		},
	},
};
</script>

<style lang="scss" scoped>
.comment-box {
	margin-top: 1rem;
	padding: 0.5rem;
	padding-top: 0.25rem;
	background-color: #ddd;
	border-radius: 1rem;
	border-top-left-radius: unset;

	display: grid;
	grid-template-columns: 40px auto auto;
	grid-template-rows: repeat(3, auto);
	grid-template-areas:
		"date date btn"
		"pic name name"
		"pic com com";
}

.date {
	grid-area: date;
	font-size: 0.75rem;
	margin-bottom: 0.25rem;
}

.delete-btn {
	grid-area: btn;
	margin-left: 1rem;
	justify-self: end;
}

.profile-picture {
	grid-area: pic;
	height: 30px;
	aspect-ratio: 1;
	border-radius: 50%;
	object-fit: cover;
	object-position: top;
}

.username {
	grid-area: name;
	font-weight: 500;
}

.comment {
	grid-area: com;
	margin: 0;
	padding-right: 0.5rem;
}
</style>
