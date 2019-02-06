import Vue from 'vue';
import Vuex from 'vuex';
import AuthService from '@/services/AuthService';
import TaskService from '@/services/TaskService';

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
    ADD_TASK: ({ tasks }, payload) => {
      tasks.unshift(payload);
    },
    UPDATE_TASK: ({ tasks }, payload) => {
      const index = tasks.findIndex(task => task._id === payload._id);
      Vue.set(tasks, index, payload);
    },
    DELETE_TASK: ({ tasks }, payload) => {
      const index = tasks.findIndex(task => task._id === payload);
      tasks.splice(index, 1);
    },
  },
  actions: {
    async loginUser({ commit }, { email, password }) {
      const user = await AuthService.login({
        email,
        password,
      });

      commit('SET_USER', {
        token: user.token,
        fullName: user.fullName,
      });
    },
    clearUser({ commit }) {
      commit('CLEAR_USER');
      commit('CLEAR_TASKS');
    },
    async loadTasks({ commit }) {
      const tasks = await TaskService.getAll();
      commit('CLEAR_TASKS');
      commit('SET_TASKS', tasks);
    },
    async createTask({ commit }, { description, dueDate }) {
      const createdTask = await TaskService.create({ description, dueDate });
      commit('ADD_TASK', createdTask);
    },
    async updateTask({ commit }, { id, description, dueDate }) {
      const updatedTask = await TaskService.update({ id, description, dueDate });
      commit('UPDATE_TASK', updatedTask);
    },
    async deleteTask({ commit }, taskId) {
      await TaskService.delete(taskId);
      commit('DELETE_TASK', taskId);
    },
  },
  getters: {
    getTasks: state => state.tasks,
  },
});
