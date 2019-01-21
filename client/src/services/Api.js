import axios from 'axios';
import store from '@/store/store';

const apiHost = process.env.VUE_APP_API_URL || 'http://localhost:3001';
export default () => axios.create({
  baseURL: `${apiHost}/`,
  headers: {
    Authorization: `Bearer ${store.state.user && store.state.user.token}`,
  },
});
