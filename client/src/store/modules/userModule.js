import AuthService from '@/services/AuthService';

export default {
  namespaced: true,
  state: {
    token: null,
    fullName: null,
  },
  mutations: {
    SET_USER(state, { token, fullName }) {
      state.token = token;
      state.fullName = fullName;
    },
    CLEAR_USER(state) {
      state.token = null;
      state.fullName = null;
    },
  },
  actions: {
    async login({ commit }, { email, password }) {
      const user = await AuthService.login({
        email,
        password,
      });

      commit('SET_USER', {
        token: user.token,
        fullName: user.fullName,
      });
    },
    logout(context) {
      context.commit('CLEAR_USER');
      context.commit('tasks/CLEAR_TASKS', null, { root: true });
    },
  },
  getters: {
    isAuthenticated: state => !!state.token,
  },
};
