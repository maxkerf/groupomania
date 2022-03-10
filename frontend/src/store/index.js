import { createStore } from "vuex";

let user = localStorage.getItem("user");
user = user ? JSON.parse(user) : { id: -1, token: "" };

export default createStore({
	state: {
		apiRoot: "http://localhost:3000",
		token: user.token,
		userId: user.id,
	},
	getters: {},
	mutations: {
		SET_USER(state, user) {
			state.token = user.token;
			state.userId = user.id;
			localStorage.setItem("user", JSON.stringify(user));
		},

		REMOVE_USER(state) {
			state.token = "";
			state.userId = -1;
			localStorage.removeItem("user");
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
					const user = { id: data.userId, token: data.token };
					commit("SET_USER", user);
					resolve();
				} else {
					reject(Error(data.errorMessage));
				}
			});
		},

		logout({ commit }) {
			commit("REMOVE_USER");
		},

		async deleteAccount({ state }) {
			const res = await fetch(`${state.apiRoot}/users`, {
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${state.token}`,
				},
			});
			const data = await res.json();

			return new Promise((resolve, reject) => {
				res.ok ? resolve(data) : reject(Error(data.message));
			});
		},

		async addPost({ state }, post) {
			const res = await fetch(`${state.apiRoot}/posts`, {
				method: "POST",
				headers: {
					Authorization: `Bearer ${state.token}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify(post),
			});
			const data = await res.json();

			return new Promise((resolve, reject) => {
				res.ok ? resolve(data) : reject(Error(data.message));
			});
		},

		async getPosts({ state }) {
			const res = await fetch(`${state.apiRoot}/posts`, {
				headers: {
					Authorization: `Bearer ${state.token}`,
				},
			});
			const data = await res.json();

			return new Promise((resolve, reject) => {
				res.ok ? resolve(data) : reject(Error(data.message));
			});
		},

		async getOneUser({ state }, userId) {
			const res = await fetch(`${state.apiRoot}/users/${userId}`, {
				headers: {
					Authorization: `Bearer ${state.token}`,
				},
			});
			const data = await res.json();

			return new Promise((resolve, reject) => {
				res.ok
					? resolve(data)
					: reject(Object.assign({ status: res.status }, data));
			});
		},

		async apiRoot({ state }) {
			const res = await fetch(state.apiRoot, {
				headers: {
					Authorization: `Bearer ${state.token}`,
				},
			});
			const data = await res.json();

			return new Promise((resolve, reject) => {
				res.ok ? resolve(data) : reject(Error(data.message));
			});
		},
	},
	modules: {},
});
