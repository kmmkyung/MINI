import { createWebHistory, createRouter } from 'vue-router';
import weather from '@/components/weather/App.vue';
import til from '@/components/til/App.vue';
import tilLogin from '@/components/til/tilLogin.vue';
import tilSignUp from '@/components/til/tilSignUp.vue';

const routes = [
	{
		path: '/weather',
		component: weather,
	},
	{
		path: '/til/:id',
		component: til,
		children: [
			{
				path: 'login',
				component: tilLogin,
			},
			{
				path: 'singUp',
				component: tilSignUp,
			},
		],
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
