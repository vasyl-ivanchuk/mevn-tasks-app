import Vue from 'vue';
import Vuex from 'vuex';
import userModule from './modules/userModule';
import tasksModule from './modules/tasksModule';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: { user: userModule, tasks: tasksModule },
});
