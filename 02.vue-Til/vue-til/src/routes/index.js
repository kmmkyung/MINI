// 1. 라이브러리 불러오기.
import { createWebHistory, createRouter } from 'vue-router';
import loginPage from '@/views/loginPage.vue';

const routes = [
	{
		path: '/login',
		component: loginPage,
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
