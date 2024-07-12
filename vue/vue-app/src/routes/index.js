import { createWebHistory, createRouter } from 'vue-router';
import weather from '@/components/weather/index.vue';
const routes = [
	{
		path: '/weather',
		component: weather,
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
