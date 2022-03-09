import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SignupView from "../views/SignupView.vue";
import LoginView from "../views/LoginView.vue";
import AddPostView from "../views/AddPostView.vue";
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
		path: "/add-post",
		name: "addPost",
		component: AddPostView,
		meta: {
			title: "Add Post | Groupomania",
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
