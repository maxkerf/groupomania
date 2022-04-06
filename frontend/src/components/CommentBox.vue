<template>
	<div class="comment-box">
		<span
			class="date"
			:title="new Date(comment.creationDate).toLocaleString()"
			>{{ formatDate }}</span
		>
		<div v-if="comment.user_id === login.userId" class="dropdown-box">
			<button
				@click="showDropdownMenu = !showDropdownMenu"
				class="dropdown-btn"
			>
				<i class="fa-solid fa-ellipsis"></i>
			</button>
			<div v-show="showDropdownMenu" class="dropdown-menu">
				<button>Update</button>
				<button @click="$emit('delete-comment', comment)">Delete</button>
			</div>
		</div>
		<img
			class="profile-picture"
			:src="`${apiRoot}/images/user/${comment.user_picture}`"
			alt="user profile picture"
		/>
		<router-link
			class="username"
			:to="{ name: 'profile', params: { id: comment.user_id } }"
			>{{ comment.user_username }}</router-link
		>
		<p class="comment">{{ comment.text }}</p>
	</div>
</template>

<script>
import { mapState } from "vuex";

export default {
	data() {
		return {
			showDropdownMenu: false,
		};
	},
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
		"date date dropdown"
		"pic name name"
		"pic com com";
}

.date {
	grid-area: date;
	font-size: 0.75rem;
	margin-bottom: 0.25rem;
}

.dropdown-box {
	grid-area: dropdown;
	margin-left: 1rem;
	position: relative;
	display: flex;
}

.dropdown-btn {
	border: unset;
	background: unset;
	cursor: pointer;
	padding: 0.125rem 0.25rem;
	border-radius: 1rem;

	&:hover {
		background-color: #fff;
	}
}

.dropdown-menu {
	position: absolute;
	top: 20px;
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
	justify-self: start;
	padding-right: 0.5rem;

	&:hover {
		text-decoration: underline;
	}
}

.comment {
	grid-area: com;
	margin: 0;
	padding-right: 0.5rem;
}
</style>
