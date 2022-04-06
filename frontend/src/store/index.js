import { createStore } from "vuex";

const DEFAULT_LOGIN = { userId: -1, token: "" };
let login = localStorage.getItem("login");
login = login ? JSON.parse(login) : DEFAULT_LOGIN;

export default createStore({
	state: {
		apiRoot: "http://localhost:3000",
		login,
		reactionTypes: {
			dislike: 0,
			like: 1,
			love: 2,
			laugh: 3,
		},
	},
	getters: {},
	mutations: {
		SET_LOGIN(state, login) {
			state.login = login;
			localStorage.setItem("login", JSON.stringify(login));
		},

		REMOVE_LOGIN(state) {
			state.login = DEFAULT_LOGIN;
			localStorage.removeItem("login");
		},
	},
	actions: {
		/* USER */

		async signup({ state }, user) {
			const res = await fetch(`${state.apiRoot}/users/signup`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(user),
			});
			const data = await res.json();

			return new Promise((resolve, reject) => {
				res.ok
					? resolve(data)
					: reject(Object.assign({ status: res.status }, data));
			});
		},

		async login({ state, commit }, user) {
			const res = await fetch(`${state.apiRoot}/users/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(user),
			});
			const data = await res.json();

			return new Promise((resolve, reject) => {
				if (res.ok) {
					commit("SET_LOGIN", { userId: data.userId, token: data.token });
					resolve(data);
				} else {
					reject(Object.assign({ status: res.status }, data));
				}
			});
		},

		logout({ commit }) {
			commit("REMOVE_LOGIN");
		},

		async getOneUser({ state }, userId) {
			const res = await fetch(`${state.apiRoot}/users/${userId}`, {
				headers: {
					Authorization: `Bearer ${state.login.token}`,
				},
			});
			const data = await res.json();

			return new Promise((resolve, reject) => {
				res.ok
					? resolve(data)
					: reject(Object.assign({ status: res.status }, data));
			});
		},

		async updateUser({ state }, newUser) {
			const res = await fetch(`${state.apiRoot}/users`, {
				method: "PUT",
				headers: {
					Authorization: `Bearer ${state.login.token}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newUser),
			});
			const data = await res.json();

			return new Promise((resolve, reject) => {
				res.ok
					? resolve(data)
					: reject(Object.assign({ status: res.status }, data));
			});
		},

		async updateUserPicture({ state }, newPicture) {
			const formData = new FormData();
			formData.append("picture", newPicture);

			const res = await fetch(`${state.apiRoot}/users/picture`, {
				method: "PUT",
				headers: {
					Authorization: `Bearer ${state.login.token}`,
				},
				body: formData,
			});
			const data = await res.json();

			return new Promise((resolve, reject) => {
				res.ok
					? resolve(data)
					: reject(Object.assign({ status: res.status }, data));
			});
		},

		async deleteAccount({ state }) {
			const res = await fetch(`${state.apiRoot}/users`, {
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${state.login.token}`,
				},
			});
			const data = await res.json();

			return new Promise((resolve, reject) => {
				res.ok ? resolve(data) : reject(Error(data.message));
			});
		},

		/* POST */

		async addPost({ state }, post) {
			const formData = new FormData();

			if (post.image) {
				formData.append("image", post.image);
				delete post.image;
			}

			if (post.text) {
				formData.append("post", JSON.stringify(post));
			}

			const res = await fetch(`${state.apiRoot}/posts`, {
				method: "POST",
				headers: {
					Authorization: `Bearer ${state.login.token}`,
				},
				body: formData,
			});
			const data = await res.json();

			return new Promise((resolve, reject) => {
				res.ok
					? resolve(data)
					: reject(Object.assign({ status: res.status }, data));
			});
		},

		async getPosts({ state }, offset = 0) {
			const res = await fetch(`${state.apiRoot}/posts?offset=${offset}`, {
				headers: {
					Authorization: `Bearer ${state.login.token}`,
				},
			});
			const data = await res.json();

			return new Promise((resolve, reject) => {
				res.ok
					? resolve(data)
					: reject(Object.assign({ status: res.status }, data));
			});
		},

		async countPosts({ state }) {
			const res = await fetch(`${state.apiRoot}/posts/count`, {
				headers: {
					Authorization: `Bearer ${state.login.token}`,
				},
			});
			const data = await res.json();

			return new Promise((resolve, reject) => {
				res.ok
					? resolve(data)
					: reject(Object.assign({ status: res.status }, data));
			});
		},

		async deletePost({ state }, postId) {
			const res = await fetch(`${state.apiRoot}/posts/${postId}`, {
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${state.login.token}`,
				},
			});
			const data = await res.json();

			return new Promise((resolve, reject) => {
				res.ok
					? resolve(data)
					: reject(Object.assign({ status: res.status }, data));
			});
		},

		/* REACTION */

		async react({ state }, reaction) {
			const res = await fetch(
				`${state.apiRoot}/posts/${reaction.postId}/reactions`,
				{
					method: "POST",
					headers: {
						Authorization: `Bearer ${state.login.token}`,
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ type: reaction.type }),
				}
			);
			const data = await res.json();

			return new Promise((resolve, reject) => {
				res.ok
					? resolve(data)
					: reject(Object.assign({ status: res.status }, data));
			});
		},

		async getOnePostReactions({ state }, postId) {
			const res = await fetch(`${state.apiRoot}/posts/${postId}/reactions`, {
				headers: {
					Authorization: `Bearer ${state.login.token}`,
				},
			});
			const data = await res.json();

			return new Promise((resolve, reject) => {
				res.ok
					? resolve(data)
					: reject(Object.assign({ status: res.status }, data));
			});
		},

		/* COMMENT */

		async addComment({ state }, payload) {
			const res = await fetch(
				`${state.apiRoot}/posts/${payload.postId}/comments`,
				{
					method: "POST",
					headers: {
						Authorization: `Bearer ${state.login.token}`,
						"Content-Type": "application/json",
					},
					body: JSON.stringify(payload.comment),
				}
			);
			const data = await res.json();

			return new Promise((resolve, reject) => {
				res.ok
					? resolve(data)
					: reject(Object.assign({ status: res.status }, data));
			});
		},

		async getPostComments({ state }, payload) {
			const res = await fetch(
				`${state.apiRoot}/posts/${payload.postId}/comments?offset=${payload.offset}`,
				{
					headers: {
						Authorization: `Bearer ${state.login.token}`,
					},
				}
			);
			const data = await res.json();

			return new Promise((resolve, reject) => {
				res.ok
					? resolve(data)
					: reject(Object.assign({ status: res.status }, data));
			});
		},

		async getNumberComments({ state }, postId) {
			const res = await fetch(
				`${state.apiRoot}/posts/${postId}/comments/number`,
				{
					headers: {
						Authorization: `Bearer ${state.login.token}`,
					},
				}
			);
			const data = await res.json();

			return new Promise((resolve, reject) => {
				res.ok
					? resolve(data)
					: reject(Object.assign({ status: res.status }, data));
			});
		},

		async updateComment({ state }, payload) {
			const res = await fetch(
				`${state.apiRoot}/posts/${payload.postId}/comments/${payload.commentId}`,
				{
					method: "PUT",
					headers: {
						Authorization: `Bearer ${state.login.token}`,
						"Content-Type": "application/json",
					},
					body: JSON.stringify(payload.newComment),
				}
			);
			const data = await res.json();

			return new Promise((resolve, reject) => {
				res.ok
					? resolve(data)
					: reject(Object.assign({ status: res.status }, data));
			});
		},

		async deleteComment({ state }, payload) {
			const res = await fetch(
				`${state.apiRoot}/posts/${payload.postId}/comments/${payload.commentId}`,
				{
					method: "DELETE",
					headers: {
						Authorization: `Bearer ${state.login.token}`,
					},
				}
			);
			const data = await res.json();

			return new Promise((resolve, reject) => {
				res.ok
					? resolve(data)
					: reject(Object.assign({ status: res.status }, data));
			});
		},
	},
	modules: {},
});
