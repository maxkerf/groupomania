<template>
	<div :class="`comment-box${updating ? ' updating' : ''}`">
		<DateBox
			v-if="!updating"
			:creationDate="comment.creationDate"
			:lastUpdate="comment.lastUpdate"
		/>
		<div v-if="!updating">
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
			<DropdownBox
				class="dropdown-box"
				v-if="
					(login.userRole === userRoles.admin ||
						comment.user_id === login.userId) &&
					!updating
				"
				attachedElement="comment"
			>
				<DropdownMenuBtn
					@click="this.updating = true"
					name="Update"
					icon="fa-solid fa-pen"
				/>
				<DropdownMenuBtn
					@click="$emit('delete-comment', comment)"
					name="Delete"
					icon="fa-solid fa-x"
				/>
			</DropdownBox>
			<p class="comment">{{ comment.text }}</p>
		</div>
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
import DropdownMenuBtn from "../components/DropdownMenuBtn.vue";
import DateBox from "../components/DateBox.vue";

export default {
	data() {
		return {
			updating: false,
		};
	},
	components: {
		UpdateCommentForm,
		DropdownBox,
		DropdownMenuBtn,
		DateBox,
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
	&.updating {
		width: 100%;
	}

	& > div:nth-child(2) {
		background-color: #515151;
		padding: 0.25rem;
		border-radius: 0.5rem;
		border-top-left-radius: unset;
		display: grid;
		grid-template-columns: auto 1fr auto;
		grid-template-rows: auto 1fr;
	}
}

.date-box {
	font-size: 0.75rem;
	margin-bottom: 0.25rem;
	color: #b0b3b8;
}

.profile-picture {
	grid-row: span 2;
	height: 30px;
	aspect-ratio: 1;
	border-radius: 50%;
	object-fit: cover;
	margin-right: 0.5rem;
}

.username {
	text-decoration: none;
	color: #e4e6eb;
	font-weight: 500;
	justify-self: start;

	&:hover {
		text-decoration: underline;
	}
}

.dropdown-box {
	grid-row: span 2;
	align-self: flex-start;
	margin-left: 0.5rem;
}

.comment {
	margin: 0;
}

.update-comment-form {
	grid-column-start: 2;
	grid-row-start: 2;
}
</style>
