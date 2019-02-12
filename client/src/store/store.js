import Vue from 'vue';
import Vuex from 'vuex';
import userModule from './modules/userModule';
import tasksModule from './modules/tasksModule';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  modules: { user: userModule, tasks: tasksModule },
});
