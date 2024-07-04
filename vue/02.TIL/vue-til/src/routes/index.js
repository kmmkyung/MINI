import Vue from 'vue';
import VueRouter from 'vue-router';
// import LoginPage from '@/views/LoginPage.vue';
// import SingUpPage from '@/views/SingUpPage.vue';

Vue.use(VueRouter);

export default new VueRouter({
	routes: [
		{
			path: '/login',
			component: () => import('@/views/LoginPage.vue'),
		},
		{
			path: '/singUp',
			component: () => import('@/views/SingUpPage.vue'),
		},
	],
});
