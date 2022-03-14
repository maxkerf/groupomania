import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SignupView from "../views/SignupView.vue";
import LoginView from "../views/LoginView.vue";
import ProfileView from "../views/ProfileView.vue";
import NotFound from "../views/NotFound.vue";

const routes = [
	{
		path: "/",
		name: "home",
		component: HomeView,
		meta: {
			title: "Groupomania",
		},
	},
	{
		path: "/signup",
		name: "signup",
		component: SignupView,
		meta: {
			title: "Signup | Groupomania",
		},
	},
	{
		path: "/login",
		name: "login",
		component: LoginView,
		meta: {
			title: "Login | Groupomania",
		},
	},
	{
		path: "/profile/:id",
		name: "profile",
		component: ProfileView,
		meta: {
			title: "Profile | Groupomania",
		},
	},
	{
		path: "/:pathMatch(.*)",
		name: "notFound",
		component: NotFound,
		meta: {
			title: "404 Not Found",
		},
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

router.afterEach(to => {
	document.title = to.meta.title;
});

export default router;
