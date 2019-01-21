import Api from '@/services/Api';

export default {
  async getAll() {
    const response = await Api().get('tasks');
    return response.data;
  },
  async update({ id, description, dueDate }) {
    const response = await Api().put(`tasks/${id}`, {
      description, dueDate: new Date(dueDate).toISOString(),
    });
    return response.data;
  },
  async create({ description, dueDate }) {
    const response = await Api().post('task', {
      description, dueDate: new Date(dueDate).toISOString(),
    });
    return response.data;
  },
  delete(id) {
    return Api().delete(`tasks/${id}`);
  },
};
