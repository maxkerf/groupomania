import { createStore } from "vuex";

const DEFAULT_LOGIN = { userId: -1, token: "" };
let login = localStorage.getItem("login");
login = login ? JSON.parse(login) : DEFAULT_LOGIN;

export default createStore({
	state: {
		apiRoot: "http://localhost:3000",
		login,
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
		async signup({ state }, user) {
			const res = await fetch(`${state.apiRoot}/signup`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(user),
			});
			const data = await res.json();

			return new Promise((resolve, reject) => {
				res.ok ? resolve(data) : reject(Error(data.errorMessage));
			});
		},

		async login({ state, commit }, user) {
			const res = await fetch(`${state.apiRoot}/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(user),
			});
			const data = await res.json();

			return new Promise((resolve, reject) => {
				if (res.ok) {
					commit("SET_LOGIN", data);
					resolve();
				} else {
					reject(Error(data.errorMessage));
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

		async updatePicture({ state }, newPicture) {
			const formData = new FormData();
			formData.append("picture", newPicture);

			const res = await fetch(`${state.apiRoot}/users`, {
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

		async addPost({ state }, post) {
			const res = await fetch(`${state.apiRoot}/posts`, {
				method: "POST",
				headers: {
					Authorization: `Bearer ${state.login.token}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify(post),
			});
			const data = await res.json();

			return new Promise((resolve, reject) => {
				res.ok ? resolve(data) : reject(Error(data.message));
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

		async getPost({ state }, postId) {
			const res = await fetch(`${state.apiRoot}/posts/${postId}`, {
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
	},
	modules: {},
});
