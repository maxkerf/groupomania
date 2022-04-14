<template>
	<div class="comment-box">
		<div class="date-box">
			<span
				class="creation-date"
				:title="new Date(comment.creationDate).toLocaleString()"
				>{{ formatDate }}</span
			>
			<span
				v-if="comment.lastUpdate"
				:title="new Date(comment.lastUpdate).toLocaleString()"
				class="last-update"
			>
				- Updated</span
			>
		</div>
		<DropdownBox
			v-if="
				(login.userRole === userRoles.admin ||
					comment.user_id === login.userId) &&
				!updating
			"
			attachedElement="comment"
		>
			<button @click="this.updating = true">Update</button>
			<button @click="$emit('delete-comment', comment)">Delete</button>
		</DropdownBox>
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
		<p v-if="!updating" class="comment">{{ comment.text }}</p>
		<UpdateCommentForm
			v-if="updating"
			class="update-comment-form"
			:comment="comment"
			@blur="updating = false"
			@update-comment="updateComment"
		/>
	</div>
</template>

<script>
import { mapState } from "vuex";
import UpdateCommentForm from "../components/UpdateCommentForm.vue";
import DropdownBox from "../components/DropdownBox.vue";

export default {
	data() {
		return {
			updating: false,
		};
	},
	components: {
		UpdateCommentForm,
		DropdownBox,
	},
	props: ["comment"],
	computed: {
		...mapState(["apiRoot", "login", "userRoles"]),

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

		updateComment(newComment) {
			this.updating = false;
			this.$emit("update-comment", this.comment.id, newComment);
		},
	},
};
</script>

<style lang="scss" scoped>
.comment-box {
	padding: 0.5rem;
	padding-top: 0.25rem;
	background-color: #bbb;
	border-radius: 1rem;
	border-top-left-radius: unset;

	display: grid;
	grid-template-columns: 40px auto auto auto;
	grid-template-rows: repeat(3, auto);
	grid-template-areas:
		"date date dropdown"
		"pic name name"
		"pic com com";

	& + & {
		margin-top: 1rem;
	}
}

.date-box {
	grid-area: date;
	font-size: 0.75rem;
	margin-bottom: 0.25rem;
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

.update-comment-form {
	grid-area: com;
}
</style>
