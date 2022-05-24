import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Landing from "../views/Landing.vue";

import { RouteGuard } from "../helpers/RouteGuard";

const routes: Array<RouteRecordRaw> = [
	{
		path: "/",
		name: "home",
		component: () => import(/* webpackChunkName: "user-home" */ '../views/Home.vue'),
		meta: { authorized: true },
	},
	{
		path: "/dashboard/:mode",
		name: "dashboard",
		component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue'),
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

router.beforeEach(RouteGuard as any);

export default router;
