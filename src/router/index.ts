import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import Home from "../views/Home.vue";
import Landing from "../views/Landing.vue";
import Dashboard from "../views/Dashboard.vue";

import { RouteGuard } from "../helpers/RouteGuard";

const routes: Array<RouteRecordRaw> = [
	{
		path: "/",
		name: "home",
		component: Home,
		meta: { authorized: true },
	},
	{
		path: "/dashboard/:mode",
		name: "dashboard",
		component: Dashboard,
		meta: { authorized: true },
	},
	{
		path: "/connect",
		name: "connect",
		component: Landing,
		meta: { guest: true },
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

// router.beforeResolve(RouteGuard);

export default router;
