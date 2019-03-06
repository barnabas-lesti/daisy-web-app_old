import Vue from 'vue';
import VueRouter from 'vue-router';

import config from '../common/config';

import calculator from './calculator';
import exercises from './exercises';
import food from './food';
import home from './home';
import recipes from './recipes';

Vue.use(VueRouter);

export default new VueRouter({
	base: config.BASE_URL,
	mode: 'history',
	routes: [
		...calculator,
		...exercises,
		...food,
		...recipes,

		...home,
	],
});
