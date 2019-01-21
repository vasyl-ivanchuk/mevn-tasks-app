import Api from '@/services/Api';

export default {
  async login(credentials) {
    try {
      const response = await Api().post('login', credentials);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 403) {
        throw new Error(error.response.data.error);
      }
      throw new Error();
    }
  },
};
