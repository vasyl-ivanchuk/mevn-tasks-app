import Api from '@/services/Api';

export default {
  async getAll() {
    const response = await Api().get('tasks');
    return response.data;
  },
};
