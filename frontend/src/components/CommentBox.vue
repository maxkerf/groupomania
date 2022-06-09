<template>
	<div :class="`comment-box${updating ? ' updating' : ''}`">
		<DateBox
			v-show="!updating"
			:creationDate="comment.creationDate"
			:lastUpdate="comment.lastUpdate"
		/>
		<span class="update-comment-annotation" v-show="updating">
			Update your comment
		</span>
		<div v-show="!updating">
			<img
				class="profile-picture"
				:src="userPictureSource"
				alt="user profile picture"
			/>
			<router-link
				class="username"
				:to="{ name: 'profile', params: { id: comment.user_id } }"
				>{{ comment.user_username }}</router-link
			>
			<DropdownBox
				v-show="
					login.user.role === userRoles.admin ||
					comment.user_id === login.user.id
				"
				attachedElement="comment"
			>
				<DropdownMenuBtn
					@click="toggleUpdating"
					name="Update"
					icon="fa-solid fa-pen"
					ref="updateCommentBtn"
				/>
				<DropdownMenuBtn
					@click="$emit('delete-comment', comment)"
					name="Delete"
					icon="fa-solid fa-x"
				/>
			</DropdownBox>
			<p class="comment" ref="text"></p>
		</div>
		<UpdateCommentForm
			v-if="updating"
			:comment="comment"
			ref="updateCommentForm"
			@update-comment="updateComment"
		/>
	</div>
</template>

<script>
import { mapState } from "vuex";
import UpdateCommentForm from "../components/forms/UpdateCommentForm.vue";
import DropdownBox from "../components/DropdownBox.vue";
import DropdownMenuBtn from "../components/DropdownMenuBtn.vue";
import DateBox from "../components/DateBox.vue";
import getUserPictureSource from "../getUserPictureSource.js";

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

		userPictureSource() {
			return getUserPictureSource(this.apiRoot, this.comment.user_picture);
		},
	},

	watch: {
		"comment.text"() {
			this.formatText();
		},
	},

	mounted() {
		this.formatText();
	},

	methods: {
		formatText() {
			// clear
			this.$refs.text.innerText = "";
			// add line break elements
			this.comment.text.split("\n").forEach(el => {
				this.$refs.text.innerText += el;
				this.$refs.text.appendChild(document.createElement("br"));
			});
		},

		getMonthDifference(startDate, endDate) {
			return (
				endDate.getMonth() -
				startDate.getMonth() +
				12 * (endDate.getFullYear() - startDate.getFullYear())
			);
		},

		startUpdating() {
			this.updating = true;
			window.addEventListener("click", this.handleWindowClick);
		},

		stopUpdating() {
			this.updating = false;
			window.removeEventListener("click", this.handleWindowClick);
		},

		toggleUpdating() {
			this.updating ? this.stopUpdating() : this.startUpdating();
		},

		isEventInsideElement(e, el) {
			return e.composedPath().find(i => i === el) ? true : false;
		},

		isEventInsideOneOfElements(e, els) {
			for (const el of els) {
				if (this.isEventInsideElement(e, el)) return true;
			}

			return false;
		},

		handleWindowClick(e) {
			const updateCommentBtn = this.$refs.updateCommentBtn._.subTree.el;
			const updateCommentForm = this.$refs.updateCommentForm._.subTree.el;

			const els = [updateCommentBtn, ...updateCommentForm.children];

			if (!this.isEventInsideOneOfElements(e, els)) this.toggleUpdating();
		},

		updateComment(newComment) {
			this.toggleUpdating();
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

	& > div:nth-of-type(2) {
		background-color: $bg-color-2;
		padding: 0.25rem;
		border-radius: 0.5rem;
		border-top-left-radius: unset;
		display: grid;
		grid-template-columns: auto 1fr 32px;
		grid-template-rows: auto 1fr;
	}
}

.update-comment-annotation {
	font-size: 0.75rem;
	color: $txt-color-2;
	display: inline-block;
	margin-bottom: 0.25rem;
	margin-left: 0.375rem;
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
	color: $txt-color-1;
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
	grid-row-start: 2;
	grid-column-start: 2;
	margin: 0;
	overflow-wrap: anywhere;
}
</style>
