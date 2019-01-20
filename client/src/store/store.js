import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    user: null,
    tasks: [],
  },
  /* eslint-disable no-underscore-dangle */
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    CLEAR_USER(state) {
      state.user = null;
    },
    CLEAR_TASKS(state) {
      state.tasks = [];
    },
    SET_TASKS: ({ tasks }, payload) => {
      tasks.push(...payload);
    },
  },
  actions: {
    setUser({ commit }, user) {
      commit('SET_USER', user);
    },
    clearUser({ commit }) {
      commit('CLEAR_USER');
      commit('CLEAR_TASKS');
    },
    setTasks: ({ commit }, payload) => {
      commit('CLEAR_TASKS');
      commit('SET_TASKS', payload);
    },
  },
  getters: {
    getTasks: state => state.tasks,
  },
});
