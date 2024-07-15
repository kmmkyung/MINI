import { createWebHistory, createRouter } from 'vue-router';
import weather from '@/views/weather/App.vue';
import til from '@/views/til/App.vue';

const routes = [
	{
		path: '/weather',
		component: weather,
	},
	{
		path: '/til',
		component: til,
		children: [
			{
				path: '/',
				name: 'tilLogin',
				component: () => import('@/views/til/TilLogin.vue'),
			},
			{
				path: 'login',
				name: 'tilLogin',
				component: () => import('@/views/til/TilLogin.vue'),
			},
			{
				path: 'signUp',
				name: 'tilSignUp',
				component: () => import('@/views/til/TilSignUp.vue'),
			},
		],
	},
	{
		path: '/:pathMatch(.*)*',
		component: () => import('@/views/notFoundPage.vue'),
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
