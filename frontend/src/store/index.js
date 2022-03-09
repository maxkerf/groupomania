import { createStore } from "vuex";

let token = localStorage.getItem("token");
if (!token) token = "";

export default createStore({
	state: {
		apiRoot: "http://localhost:3000",
		token,
	},
	getters: {},
	mutations: {
		SET_TOKEN(state, token) {
			state.token = token;
			localStorage.setItem("token", token);
		},

		REMOVE_TOKEN(state) {
			state.token = "";
			localStorage.removeItem("token");
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
					commit("SET_TOKEN", data.token);
					resolve(data);
				} else {
					reject(Error(data.errorMessage));
				}
			});
		},

		logout({ commit }) {
			commit("REMOVE_TOKEN");
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
			const data = res.json();

			return new Promise((resolve, reject) => {
				res.ok ? resolve(data) : reject(Error(data.message));
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
